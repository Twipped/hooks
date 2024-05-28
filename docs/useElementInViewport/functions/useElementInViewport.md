[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useElementInViewport()

> **useElementInViewport**(`elementRef`, `options`): `boolean`

Tests if a given Ref element exists within a given viewport.

## Parameters

• **elementRef**: `HTMLElement` \| `MutableRefObject`\<`HTMLElement`\>

Ref to the relevant element.

• **options**

• **options.root**: `HTMLElement` \| `MutableRefObject`\<`HTMLElement`\>= `null`

The element that is used as the viewport for checking visibility of the target. Defaults to the browser viewport.

• **options.rootMargin**: `string`= `'0px'`

Margin to draw around the root element for detecting overlap. Identical to CSS `margin` definition. Defaults to 0 on all sides.

• **options.threshold**: `number`= `0`

How much of the target element must be on screen to be considered visible, from 0 to 1.

## Returns

`boolean`

## Function

useElementInViewport

## Source

[hooks/useElementInViewport.js:15](https://github.com/Twipped/hooks/blob/main/hooks/useElementInViewport.js#L15)
