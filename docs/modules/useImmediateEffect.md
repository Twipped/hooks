# Module: useImmediateEffect

## Table of contents

### Functions

- [default](useImmediateEffect.md#default)

## Functions

### default

▸ **default**(`effect`, `dependencies?`, `options?`): `void`

A synchronous pseudo-effect that evaluates immediately, and after that only when
its dependency array changes. This is helpful for reacting to prop changes.
Note that state updates within this function will trigger an error from react.

**`Function`**

useImmediateEffect

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

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `effect` | `Function` | `undefined` | Effect callback |
| `dependencies` | `any`[] | `[]` | Dependencies |
| `options?` | `Object` | `{}` | Options |
| `options.skipMount` | `boolean` | `undefined` | Pass true to skip execution on component mount |

#### Returns

`void`

#### Defined in

[hooks/useImmediateEffect.js:24](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useImmediateEffect.js#L24)
