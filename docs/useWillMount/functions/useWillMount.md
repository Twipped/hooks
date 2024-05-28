[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: ~~useWillMount()~~

> **useWillMount**(`onMount`, `onWillUnmount`?): `any`

Executes the passed function only on mount, storing the result
and returning it during every render until unmounted.

## Parameters

• **onMount**: `Function`

Callback to invoke on mount

• **onWillUnmount?**: `Function`

Callback to invoke on Unmount

## Returns

`any`

Returns the result of the onMount function.

## Function

useWillMount

## Deprecated

use useMountEffect instead

## Source

[hooks/useWillMount.js:13](https://github.com/Twipped/hooks/blob/main/hooks/useWillMount.js#L13)
