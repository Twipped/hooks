[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useEventHandler()

> **useEventHandler**(`event`, `listener`, `capture`?): [`EventHandlerInterface`](../type-aliases/EventHandlerInterface.md)

Attaches an event handler to a specified DOM element, bypassing the react synthetic event system.
Handler is automatically cleaned up when the calling component unmounts.

## Parameters

• **event**: keyof ElementEventMap \| keyof GlobalEventHandlersEventMap

Name of the DOM event to listen for.

• **listener**: `Function`

An event handler

• **capture?**: `boolean`= `false`

Whether or not to listen during the capture event phase

## Returns

[`EventHandlerInterface`](../type-aliases/EventHandlerInterface.md)

The attachment interface

## Function

useEventHandler

## Source

[hooks/useEventHandler.js:36](https://github.com/Twipped/hooks/blob/main/hooks/useEventHandler.js#L36)
