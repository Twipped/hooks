[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useChosenOne()

> **useChosenOne**(`channel`): [`ChosenStatus`](../interfaces/ChosenStatus.md)

Tracks component instantiation and reports if the current component is the
first and/or last instance of the component. Useful for fullscreen effects such
as backdrops where you do not want multiple instances.

## Parameters

• **channel**: `string` \| `symbol`

The name/category of the component to be tracked.

## Returns

[`ChosenStatus`](../interfaces/ChosenStatus.md)

## Function

useChosenOne

## Source

[hooks/useChosenOne.js:103](https://github.com/Twipped/hooks/blob/main/hooks/useChosenOne.js#L103)
