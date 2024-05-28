[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useDefer()

> **useDefer**(`fn`?): [`TimeoutHandler`](../../useTimeout/interfaces/TimeoutHandler.md)

Returns a controller object for performing a UI deferred task that is properly cleaned up
if the component unmounts before the task complete. New deferrals cancel and replace
existing ones.

## Parameters

• **fn?**: `Function`

A base function for the timeout.

## Returns

[`TimeoutHandler`](../../useTimeout/interfaces/TimeoutHandler.md)

## Function

useDefer

## Source

[hooks/useDefer.js:14](https://github.com/Twipped/hooks/blob/main/hooks/useDefer.js#L14)
