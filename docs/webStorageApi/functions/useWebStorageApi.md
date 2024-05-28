[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useWebStorageApi()

> `private` **useWebStorageApi**(`store`, `key`, `defaultValue`?, `options`?): `WebStorageStateHookInterface`\<`string` \| `number` \| `boolean` \| `object`\>

Abstract function for WebStorage API

## Parameters

• **store**: `Storage`

Which API to use

• **key**: `string`

Name of the key to store the value into

• **defaultValue?**: `any`= `DEFAULT`

The initial value to use if the key does not exist

• **options?**= `{}`

• **options.isJSON?**: `boolean`= `true`

## Returns

`WebStorageStateHookInterface`\<`string` \| `number` \| `boolean` \| `object`\>

## Function

useWebStorage

## Source

[hooks/webStorageApi.js:21](https://github.com/Twipped/hooks/blob/main/hooks/webStorageApi.js#L21)
