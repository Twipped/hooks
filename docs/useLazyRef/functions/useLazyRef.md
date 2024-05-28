[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useLazyRef()

> **useLazyRef**\<`L`\>(`fn`): `MutableRefObject`\<`L`\>

Exactly the same as `useRef` except it accepts a function to produce the initial value.
Useful when the default is relatively costly to construct.

## Type parameters

• **L**

## Parameters

• **fn**: `L` \| [`RefDispatch`](../type-aliases/RefDispatch.md)\<`L`\>

A function to execute on ref initialization.

## Returns

`MutableRefObject`\<`L`\>

## Source

[hooks/useLazyRef.js:18](https://github.com/Twipped/hooks/blob/main/hooks/useLazyRef.js#L18)
