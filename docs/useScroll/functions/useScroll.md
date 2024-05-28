[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useScroll()

> **useScroll**(`ref`, `baseOptions`?): `Function`

Hook to tween the scroll position of an overflow:scroll element.

## Parameters

• **ref**: `MutableRefObject`\<`HTMLElement`\>

The target element.

• **baseOptions?**= `{}`

• **baseOptions.duration?**: `number`

Duration of the animation, in milliseconds

• **baseOptions.easing?**: `Function`

Easing function to use for the animation.

• **baseOptions.left?**: `number`

Target scrollLeft value.

• **baseOptions.top?**: `number`

Target scrollTop value.

## Returns

`Function`

## Function

useScroll

## Example

```ts
const ref = useRef();
const refScroll = useSroll(ref);
const scrollToTop = useCallback(() => refScroll({ top: 0, duration: 500 }))

return <div style={{ overflow: scroll }} ref={ref} onClick={scrolltoTop} />;
```

## Source

[hooks/useScroll.js:28](https://github.com/Twipped/hooks/blob/main/hooks/useScroll.js#L28)
