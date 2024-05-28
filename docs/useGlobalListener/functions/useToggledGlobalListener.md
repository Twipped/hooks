[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useToggledGlobalListener()

> **useToggledGlobalListener**(`eventName`, `listener`, `capture`?, `ownerElementRef`?): [`GlobalListenerInterface`](../type-aliases/GlobalListenerInterface.md)

Similar to useGlobalListener, but only binds to the target when told to.
Returns an object containing `remove`, `attach`, and `when` functions.
`when` will attach as long as the provided value is truthy.

## Parameters

• **eventName**: `string`

Name of the DOM event to listen for.

• **listener**: `Function`

An event handler

• **capture?**: `boolean`= `false`

Whether or not to listen during the capture event phase

• **ownerElementRef?**: `HTMLElement` \| `RefObject`\<`HTMLElement`\>= `null`

Ref of an element
in the document to be bound to.

## Returns

[`GlobalListenerInterface`](../type-aliases/GlobalListenerInterface.md)

## Function

useToggledGlobalListener

## Source

[hooks/useGlobalListener.js:112](https://github.com/Twipped/hooks/blob/main/hooks/useGlobalListener.js#L112)
