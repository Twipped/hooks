[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useStableMemo()

> **useStableMemo**\<`T`\>(`factory`, `dependencies`, `options`?): `T`

Identical to `useMemo` _except_ that it provides a semantic guarantee that
values will not be invalidated unless the dependencies change. This is unlike
the built in `useMemo` which may discard memoized values for performance reasons.

useStableMemo also provides the ability to perform a deep equality check on dependencies,
and also allows you pass an object as the dependencies value.

## Type parameters

• **T**

## Parameters

• **factory**

A function that returns a value to be memoized

• **dependencies**: `any`

A dependency array or object

• **options?**= `{}`

Options

• **options.comparison?**: [`Comparison`](../../useAsyncEffect/type-aliases/Comparison.md)= `false`

The comparison function used to detect if
the dependencies change. Defaults to a shallow equal, pass true to use deep equality.

## Returns

`T`

## Function

useStableMemo

## Source

[hooks/useStableMemo.js:23](https://github.com/Twipped/hooks/blob/main/hooks/useStableMemo.js#L23)
