# Module: useProxyRef

## Table of contents

### Type Aliases

- [Ref](useProxyRef.md#ref)

### Functions

- [default](useProxyRef.md#default)

## Type Aliases

### Ref

Ƭ **Ref**<\>: `Ref`

#### Defined in

[hooks/useProxyRef.js:4](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useProxyRef.js#L4)

## Functions

### default

▸ **default**(`options?`): `any`

Creates a Ref object that triggers a function when its contents change.

**`Function`**

useProxyRef

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` |  |
| `options.defaultValue` | `any` | The initial value of the ref. |
| `options.deferred` | `boolean` | If true, the function will be triggered asynchronously |
| `options.onChange` | `Function` | The function to trigger on change. Receives the new value of the ref. If a function is returned, it will be invoked at next change, like useEffect. |

#### Returns

`any`

#### Defined in

[hooks/useProxyRef.js:17](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useProxyRef.js#L17)
