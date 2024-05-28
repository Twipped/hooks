[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useSmartEffect()

> **useSmartEffect**(`effect`, `dependencies`, `options`?): `void`

Identical to useEffect, except dependencies may be compared deeply.

## Parameters

• **effect**: `EffectCallback`

The function to execute after render.

• **dependencies**: `any`

An object or array of values to compare for changes.

• **options?**= `{}`

• **options.comparison?**: [`Comparison`](../../useAsyncEffect/type-aliases/Comparison.md)= `true`

The comparison function used to detect if
the dependencies change. Defaults to a shallow equal, pass true to use deep equality.

## Returns

`void`

## Function

useSmartEffect

## Source

[hooks/useSmartEffect.js:18](https://github.com/Twipped/hooks/blob/main/hooks/useSmartEffect.js#L18)
