[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useUpdateEffect()

> **useUpdateEffect**(`effect`, `dependencies`, `options`?): `void`

Runs an effect *only* when the dependencies have changed, skipping the
initial "on mount" run. Caution, if the dependency list never changes,
the effect is **never run**

## Parameters

• **effect**: `EffectCallback`

An effect to run on mount

• **dependencies**: `any`

Dependencies

• **options?**= `{}`

• **options.comparison?**: [`Comparison`](../../useAsyncEffect/type-aliases/Comparison.md)= `false`

The comparison function used to detect if
the dependencies change. Defaults to a shallow equal, pass true to use deep equality.

## Returns

`void`

## Function

useUpdateEffect

## Example

```ts
js
 const ref = useRef<HTMLInput>(null);

 // focuses an element only if the focus changes, and not on mount
 useUpdateEffect(() => {
   const element = ref.current?.children[focusedIdx] as HTMLElement

   element?.focus()

 }, [focusedIndex])
```

## Source

[hooks/useUpdateEffect.js:30](https://github.com/Twipped/hooks/blob/main/hooks/useUpdateEffect.js#L30)
