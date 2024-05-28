[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useMountEffect()

> **useMountEffect**(`effect`): `boolean`

Performs the given effect only after true mount, accounting for StrictMode.
If the effect returns a destructor callback, it will be invoked on
component dismount.

## Parameters

• **effect**: `EffectCallback`

Callback to invoke on mount

## Returns

`boolean`

Returns whether the component is actually mounted

## Function

useMountEffect

## Source

[hooks/useMountEffect.js:17](https://github.com/Twipped/hooks/blob/main/hooks/useMountEffect.js#L17)
