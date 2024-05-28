[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: childDescender()

> **childDescender**(`children`, `shouldDescend`?): `any`

Generator function which iterates recursively through a react component's children.
By default this will exclude text nodes and non-component values

## Parameters

• **children**: `ReactNode` \| `ReactNode`[]

• **shouldDescend?**: `boolean` \| [`shouldDescendPredicate`](../type-aliases/shouldDescendPredicate.md)= `false`

Pass true to yield all child elements,
not just valid components. Pass a function to evaluate each child element individually.

## Returns

`any`

## Yields

## Source

[hooks/children.js:130](https://github.com/Twipped/hooks/blob/main/hooks/children.js#L130)
