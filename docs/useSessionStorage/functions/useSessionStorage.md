[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useSessionStorage()

> **useSessionStorage**(`key`, `defaultValue`, `options`): `WebStorageStateHookInterface`\<`string` \| `number` \| `boolean` \| `object`\>

Creates a state store that is connected to the browser sessionStorage

## Parameters

• **key**: `string`

Name of the key to store the value into

• **defaultValue**: `any`

The initial value to use if the key does not exist.

• **options**

• **options.isJSON**: `boolean`

Controls if the value should be
serialized/deserialized as JSON. Defaults to true.

## Returns

`WebStorageStateHookInterface`\<`string` \| `number` \| `boolean` \| `object`\>

A three item array
containing: state, setState, getState

## Function

useSessionStorage

## Source

[hooks/useSessionStorage.js:17](https://github.com/Twipped/hooks/blob/main/hooks/useSessionStorage.js#L17)
