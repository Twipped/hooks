[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useComponentPosition()

> **useComponentPosition**(`ref`, `onUpdate`?): [`Position`](../interfaces/Position.md)

Retrieves the current page position of the element Ref passed.

## Parameters

• **ref**: `MutableRefObject`\<`HTMLElement`\>

React ref (from createRef or useRef) that will contain an element reference.

• **onUpdate?**: `Function`

Optional function to fire when the position changes.

## Returns

[`Position`](../interfaces/Position.md)

`top` and `left` properties, relative to the top left of the document. `width` and `height` of the element.

## Function

useComponentPosition

## Source

[hooks/useComponentPosition.js:26](https://github.com/Twipped/hooks/blob/main/hooks/useComponentPosition.js#L26)
