[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useLocalStorage()

> **useLocalStorage**(`key`, `defaultValue`?, `options`?): `WebStorageStateHookInterface`\<`string` \| `number` \| `boolean` \| `object`\>

Creates a state store that is connected to the browser localStorage

## Parameters

• **key**: `string`

Name of the key to store the value into

• **defaultValue?**: `any`

The initial value to use if the key does not exist.

• **options?**

• **options.isJSON?**: `boolean`

Controls if the value should be
serialized/deserialized as JSON. Defaults to true.

## Returns

`WebStorageStateHookInterface`\<`string` \| `number` \| `boolean` \| `object`\>

## Function

useLocalStorage

## Source

[hooks/useLocalStorage.js:16](https://github.com/Twipped/hooks/blob/main/hooks/useLocalStorage.js#L16)
