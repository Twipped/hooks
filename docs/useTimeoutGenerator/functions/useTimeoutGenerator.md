[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useTimeoutGenerator()

> `private` **useTimeoutGenerator**(`setter`, `clearer`, `rootFn`?): [`TimeoutHandler`](../../useTimeout/interfaces/TimeoutHandler.md)

Produces the wrapping interface used by useTimeout and useDefer

## Parameters

• **setter**: `Function`

setFunction

• **clearer**: `Function`

clearFunction

• **rootFn?**: `Function`

Function to invoke

## Returns

[`TimeoutHandler`](../../useTimeout/interfaces/TimeoutHandler.md)

## Source

[hooks/useTimeoutGenerator.js:15](https://github.com/Twipped/hooks/blob/main/hooks/useTimeoutGenerator.js#L15)
