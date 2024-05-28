[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useImmediateEffect()

> **useImmediateEffect**(`effect`, `dependencies`, `options`?): `void`

A synchronous pseudo-effect that evaluates immediately, and after that only when
its dependency array changes. This is helpful for reacting to prop changes.
Note that state updates within this function will trigger an error from react.

## Parameters

• **effect**: `EffectCallback`

Effect callback

• **dependencies**: `any`= `[]`

Dependencies

• **options?**= `{}`

Options

• **options.comparison?**: [`Comparison`](../../useAsyncEffect/type-aliases/Comparison.md)= `false`

The comparison function used to detect if
the dependencies change. Defaults to a shallow equal, pass true to use deep equality.

• **options.skipMount?**: `boolean`

Pass true to skip execution on component mount

## Returns

`void`

## Function

useImmediateEffect

## Example

```ts
js
function Example({ value }) {
  const [intermediaryValue, setValue] = useState(value);

  useImmediateUpdateEffect(() => {
    setTimeout(() => setValue(value));
  }, [value])
```

## Source

[hooks/useImmediateEffect.js:28](https://github.com/Twipped/hooks/blob/main/hooks/useImmediateEffect.js#L28)
