# Webstorm Error Template

Exports from typescript packages that are marked as `composite` are not picked up, re: usage detection.

## Setup

```shell
pnpm install
pnpm build
```

## Bug

- Line 4 of [App.tsx](./packages/consumer/src/App.tsx) should highlight `Example` and navigate to it on ctrl+click. It is not detected.
- [example.tsx](./packages/react-lib/src/components/example/example.tsx)
  - The component's usage in the dependent package is not detected.

