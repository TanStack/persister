import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync, writeFileSync } from 'node:fs'
import { generateReferenceDocs } from '@tanstack/config/typedoc'

import fg from 'fast-glob'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

/** @type {import('@tanstack/config/typedoc').Package[]} */
const packages = [
  {
    name: 'persister',
    entryPoints: [resolve(__dirname, '../packages/persister/src/index.ts')],
    tsconfig: resolve(__dirname, '../packages/persister/tsconfig.docs.json'),
    outputDir: resolve(__dirname, '../docs/reference'),
  },
  {
    name: 'react-persister',
    entryPoints: [
      resolve(__dirname, '../packages/react-persister/src/index.ts'),
    ],
    tsconfig: resolve(
      __dirname,
      '../packages/react-persister/tsconfig.docs.json',
    ),
    outputDir: resolve(__dirname, '../docs/framework/react/reference'),
    exclude: ['packages/persister/**/*'],
  },
]

await generateReferenceDocs({ packages })

// Find all markdown files matching the pattern
const markdownFiles = [
  ...(await fg('docs/reference/**/*.md')),
  ...(await fg('docs/framework/*/reference/**/*.md')),
]

console.log(`Found ${markdownFiles.length} markdown files to process\n`)

// Process each markdown file
markdownFiles.forEach((file) => {
  const content = readFileSync(file, 'utf-8')
  let updatedContent = content
  updatedContent = updatedContent.replaceAll(/\]\(\.\.\//gm, '](../../')
  // updatedContent = content.replaceAll(/\]\(\.\//gm, '](../')
  updatedContent = updatedContent.replaceAll(
    /\]\((?!https?:\/\/|\/\/|\/|\.\/|\.\.\/|#)([^)]+)\)/gm,
    (match, p1) => `](../${p1})`,
  )

  // Write the updated content back to the file
  if (updatedContent !== content) {
    writeFileSync(file, updatedContent, 'utf-8')
    console.log(`Processed file: ${file}`)
  }
})

console.log('\n✅ All markdown files have been processed!')

process.exit(0)
