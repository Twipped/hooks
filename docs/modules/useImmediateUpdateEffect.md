# Module: useImmediateUpdateEffect

## Table of contents

### Functions

- [default](useImmediateUpdateEffect.md#default)

## Functions

### default

▸ **default**(`effect`, `dependencies`): `void`

A synchronous effect that evaluates only when its dependency array changes.
This is helpful for reacting to prop changes. Note that state updates within this function
will trigger an error from react.

**`Function`**

useImmediateUpdateEffect

**`Example`**

```ts
js
function Example({ value }) {
  const [intermediaryValue, setValue] = useState(value);

  useImmediateUpdateEffect(() => {
    setTimeout(() => setValue(value));
  }, [value])
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | `Function` |
| `dependencies` | `any`[] |

#### Returns

`void`

#### Defined in

[hooks/useImmediateUpdateEffect.js:22](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useImmediateUpdateEffect.js#L22)
