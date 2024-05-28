[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useMemoChildren()

> **useMemoChildren**\<`T`\>(`factory`, `children`): `T`

Functionally identical to `useMemo`, except it takes a react `children` prop as
its dependencies, memozing the results of the factory function against the elements given.

## Type parameters

• **T** *extends* `unknown`

## Parameters

• **factory**

• **children**: `ReactNode` \| `ReactNode`[]

## Returns

`T`

## Source

[hooks/useMemoChildren.js:12](https://github.com/Twipped/hooks/blob/main/hooks/useMemoChildren.js#L12)
