[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useTripWire()

> **useTripWire**(`value`): [`boolean`, () => `void`]

Returns false as long as the passed value remains falsy. Once the value becomes
truthy, the return will also become truthy and remain so until reset.

## Parameters

• **value**: `any`

The triggering value.

## Returns

[`boolean`, () => `void`]

Returns an array containing the current
value and a function to reset to false.

## Function

useTripWire

## Source

[hooks/useTripWire.js:12](https://github.com/Twipped/hooks/blob/main/hooks/useTripWire.js#L12)
