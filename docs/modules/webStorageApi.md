# Module: webStorageApi

## Table of contents

### Type Aliases

- [Storage](webStorageApi.md#storage)

### Functions

- [storageKeys](webStorageApi.md#storagekeys)
- [useWebStorageApi](webStorageApi.md#usewebstorageapi)

## Type Aliases

### Storage

Ƭ **Storage**<\>: `Object`

#### Defined in

[hooks/webStorageApi.js:9](https://github.com/Twipped/hooks/blob/86a2b07/hooks/webStorageApi.js#L9)

## Functions

### storageKeys

▸ `Private` **storageKeys**(`store`): `Generator`<`any`, `void`, `unknown`\>

Generator that lists all stored keys.

**`Yields`**

Iterates each available key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `store` | `any` | WebStorage API |

#### Returns

`Generator`<`any`, `void`, `unknown`\>

#### Defined in

[hooks/webStorageApi.js:82](https://github.com/Twipped/hooks/blob/86a2b07/hooks/webStorageApi.js#L82)

___

### useWebStorageApi

▸ `Private` **useWebStorageApi**(`store`, `key`, `defaultValue?`, `options?`): [`StateHookInterface`](typedefs.md#statehookinterface)

Abstract function for WebStorage API

**`Function`**

useWebStorage

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `store` | `any` | `undefined` | Which API to use |
| `key` | `string` | `undefined` | Name of the key to store the value into |
| `defaultValue?` | `any` | `DEFAULT` | The initial value to use if the key does not exist |
| `options` | `Object` | `{}` |  |
| `options.isJSON` | `boolean` | `undefined` |  |

#### Returns

[`StateHookInterface`](typedefs.md#statehookinterface)

A three item array containing: state, setState, getState

#### Defined in

[hooks/webStorageApi.js:24](https://github.com/Twipped/hooks/blob/86a2b07/hooks/webStorageApi.js#L24)
