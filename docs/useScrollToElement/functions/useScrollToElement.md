[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useScrollToElement()

> **useScrollToElement**(`options`?): (`target`) => `void`

Provides a mechanism to smoothly scroll to the target element.

## Parameters

• **options?**= `{}`

• **options.auto?**: `HTMLElement` \| `MutableRefObject`\<`HTMLElement`\>

If given an element or ref, will automatically scroll to that element the moment
it becomes available.

• **options.delay?**: `number`

Milliseconds to pause until starting to scroll

• **options.duration?**: `number`

Duration of the scroll animation, in milliseconds

• **options.easing?**: [`easing`](../type-aliases/easing.md)

Easing function for the animation.
Defaults to ease-in-out-quad https://easings.net/#easeInOutQuad

• **options.offsetLeft?**: `number` \| (`delta`) => `number`

Offset delta from the left edge
of the component, in pixels. May also be a function that is invoked at start of scroll,
receiving 1 or -1 to indicate scroll direction.

• **options.offsetTop?**: `number` \| (`delta`) => `number`

Offset delta from the top edge
of the component, in pixels. May also be a function that is invoked at start of scroll,
receiving 1 or -1 to indicate scroll direction.

• **options.onEnter?**: `Function`

• **options.onEntered?**: `Function`

• **options.onEntering?**: `Function`

• **options.onExit?**: `Function`

• **options.onExited?**: `Function`

• **options.onExiting?**: `Function`

## Returns

`Function`

Returns a callback that receives a target element.

### Parameters

• **target**: `HTMLElement`

### Returns

`void`

## Function

useScrollToElement

## Source

[hooks/useScrollToElement.js:110](https://github.com/Twipped/hooks/blob/main/hooks/useScrollToElement.js#L110)
