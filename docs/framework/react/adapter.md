---
title: TanStack Persister React Adapter
id: adapter
---

If you are using TanStack Persister in a React application, we recommend using the React Adapter. The React Adapter provides a set of easy-to-use hooks on top of the core Persister utilities. If you find yourself wanting to use the core Persister classes/functions directly, the React Adapter will also re-export everything from the core package.

## Installation

```sh
npm install @tanstack/react-persister
```

## React Hooks

See the [React Functions Reference](../reference/index.md) to see the full list of hooks available in the React Adapter.

## Basic Usage

Import a react specific hook from the React Adapter.

```tsx
import { useDebouncedValue } from '@tanstack/react-persister'

const [instantValue, instantValueRef] = useState(0)
const [debouncedValue, debouncer] = useDebouncedValue(instantValue, {
  wait: 1000,
})
```

Or import a core Persister class/function that is re-exported from the React Adapter.

```tsx
import { debounce, Debouncer } from '@tanstack/react-persister' // no need to install the core package separately
```

