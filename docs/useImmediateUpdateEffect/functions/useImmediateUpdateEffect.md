[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useImmediateUpdateEffect()

> **useImmediateUpdateEffect**(`effect`, `dependencies`): `void`

A synchronous effect that evaluates only when its dependency array changes.
This is helpful for reacting to prop changes. Note that state updates within this function
will trigger an error from react.

## Parameters

• **effect**: `Function`

• **dependencies**: `any`[]

## Returns

`void`

## Function

useImmediateUpdateEffect

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

[hooks/useImmediateUpdateEffect.js:22](https://github.com/Twipped/hooks/blob/main/hooks/useImmediateUpdateEffect.js#L22)
