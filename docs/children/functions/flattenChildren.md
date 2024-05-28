[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: flattenChildren()

> **flattenChildren**(`children`, `shouldDescend`?): [`FlattenedChild`](../interfaces/FlattenedChild.md)[]

Flattens a component tree into a single array of descriptive objects, suitable
for use in memoization.

## Parameters

• **children**: `ReactNode` \| `ReactNode`[]

The react `children` property

• **shouldDescend?**: `boolean` \| [`shouldDescendPredicate`](../type-aliases/shouldDescendPredicate.md)= `true`

Pass true to yield all child elements,
not just valid components. Pass a function to evaluate each child element individually.

## Returns

[`FlattenedChild`](../interfaces/FlattenedChild.md)[]

## Source

[hooks/children.js:168](https://github.com/Twipped/hooks/blob/main/hooks/children.js#L168)
