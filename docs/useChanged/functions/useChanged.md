[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useChanged()

> **useChanged**(`dependency`, `options`?): [`string`, `boolean`]

Produces a unique string which will change if the given value differs from what was
previously provided. Use this integer in place of the actual value on react hooks,
when the dependency is an object or array which may change in key count.

Note, this is NOT a hash of the object's contents. Passing the same object
to two different components using this hook will not produce the same value.

## Parameters

• **dependency**: `any`

An object or array of values to compare for changes.

• **options?**= `{}`

• **options.comparison?**: [`Comparison`](../../useAsyncEffect/type-aliases/Comparison.md)= `false`

The comparison function used to detect if
the dependencies change. Defaults to a shallow equal, pass true to use deep equality.

## Returns

[`string`, `boolean`]

## Function

useChanged

## Source

[hooks/useChanged.js:23](https://github.com/Twipped/hooks/blob/main/hooks/useChanged.js#L23)
