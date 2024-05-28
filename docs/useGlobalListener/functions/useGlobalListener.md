[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useGlobalListener()

> **useGlobalListener**(`eventName`, `listener`, `capture`?, `ownerElementRef`?): `void`

Attaches an event handler outside directly to the `document`,
bypassing the react synthetic event system.

## Parameters

• **eventName**: `string`

Name of the DOM event to listen for.

• **listener**

An event handler

• **capture?**: `boolean`= `false`

Whether or not to listen during the capture event phase

• **ownerElementRef?**: [`Resolvable`](../type-aliases/Resolvable.md)\<`Node` \| `Window` & *typeof* `globalThis`\>= `null`

Ref to element to listen to instead of document

## Returns

`void`

## Function

useGlobalListener

## Example

```ts
useGlobalListener('keydown', (event) => {
 console.log(event.key)
});
```

## Source

[hooks/useGlobalListener.js:58](https://github.com/Twipped/hooks/blob/main/hooks/useGlobalListener.js#L58)
