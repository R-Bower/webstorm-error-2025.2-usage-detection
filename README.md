
# WebStorm Issue Summary

## Problem

WebStorm fails to detect usage when using TypeScript path mappings for internal package imports, causing false "unused" warnings and breaking refactoring/find usages functionality.

## Setup

- Single npm package with multiple secondary entrypoints (`package/module-1`, `package/module-2`, etc.)
- Internal cross-module imports use path mapping for consistency with external API and to avoid duplicating code in the final bundle

## TypeScript Configuration

```json
{
  "compilerOptions": {
    "paths": {
      "@project/react-lib/*": ["./src/*/index.ts"]
    }
  }
}
```

## Code Example
```ts
// @project/react-lib

// src/module-1/index.ts
export function useModule1() {}

// src/module-2/index.ts
import {useModule1} from "@project/react-lib/module-1"  // detected via tsconfig path mapping

export function useModule2() {
  useModule1()
}
```

```ts
// consuming apps

// src/app.tsx
import {useModule2} from "@project/react-lib/module-2"

useModule2()
```

## Expected Behavior

WebStorm should recognize that `useModule2` is used by both the `consumer-broken` and `consumer-with-fix` packages.

## Actual Behavior

WebStorm doesn't detect usages from the `consumer-broken` package.

## Workaround

- Enforce path mappings in `tsconfig.json` for all workspace dependencies. See [packages/consumer-with-fix/tsconfig.json](./packages/consumer-with-fix/tsconfig.json)

## Impact

Significantly hampers development workflow for packages with secondary entrypoints used in workspaces.
