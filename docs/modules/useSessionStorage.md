# Module: useSessionStorage

## Table of contents

### Namespaces

- [default](useSessionStorage.default.md)

### Functions

- [default](useSessionStorage.md#default)

## Functions

### default

▸ **default**(`key`, `defaultValue`, `options`): [state: any, setState: Function, getState: Function]

Creates a state store that is connected to the browser sessionStorage

**`Function`**

useSessionStorage

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Name of the key to store the value into |
| `defaultValue` | `any` | The initial value to use if the key does not exist. |
| `options` | `Object` |  |
| `options.isJSON` | `boolean` | Controls if the value should be serialized/deserialized as JSON. Defaults to true. |

#### Returns

[state: any, setState: Function, getState: Function]

A three item array
containing: state, setState, getState

#### Defined in

[hooks/useSessionStorage.js:16](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useSessionStorage.js#L16)
