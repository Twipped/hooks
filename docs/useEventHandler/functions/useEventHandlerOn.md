[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useEventHandlerOn()

> **useEventHandlerOn**(`ref`, `event`, `listener`, `capture`?): `void`

Creates an event handler attached to the given element (or element containing ref)

## Parameters

• **ref**: `MutableRefObject`\<`HTMLElement`\>

Target element to attach to,
when ready.

• **event**: keyof `ElementEventMap`

Name of the DOM event to listen for.

• **listener**: `Function`

An event handler

• **capture?**: `boolean`= `false`

Whether or not to listen during the capture event phase

## Returns

`void`

## Function

useEventHandlerOn

## Source

[hooks/useEventHandler.js:87](https://github.com/Twipped/hooks/blob/main/hooks/useEventHandler.js#L87)
