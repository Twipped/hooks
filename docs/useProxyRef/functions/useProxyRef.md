[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useProxyRef()

> **useProxyRef**(`options`): `MutableRefObject`\<`any`\>

Creates a Ref object that triggers a function when its contents change.

## Parameters

• **options**= `{}`

• **options.defaultValue**: `any`

The initial value of the ref.

• **options.deferred**: `boolean`= `false`

If true, the function will be triggered asynchronously

• **options.onChange**: `Function`

The function to trigger on change. Receives the new
value of the ref. If a function is returned, it will be invoked at next change, like useEffect.

## Returns

`MutableRefObject`\<`any`\>

## Function

useProxyRef

## Source

[hooks/useProxyRef.js:17](https://github.com/Twipped/hooks/blob/main/hooks/useProxyRef.js#L17)
