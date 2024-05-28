[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useDeferredLoop()

> **useDeferredLoop**(`fn`, `pause`?): [`IntervalHandler`](../../useInterval/type-aliases/IntervalHandler.md)

Creates a defer timer that loops on the UI thread update and is properly
cleaned up when a component is unmounted

## Parameters

• **fn**

A function run on each interval

• **pause?**: `boolean`

Pass true to halt the loop

## Returns

[`IntervalHandler`](../../useInterval/type-aliases/IntervalHandler.md)

## Function

useDeferredLoop

## Source

[hooks/useDeferredLoop.js:12](https://github.com/Twipped/hooks/blob/main/hooks/useDeferredLoop.js#L12)
