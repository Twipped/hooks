# Module: useScroll

## Table of contents

### Functions

- [default](useScroll.md#default)

## Functions

### default

▸ **default**(`ref`, `baseOptions?`): `Function`

Hook to tween the scroll position of an overflow:scroll element.

**`Function`**

useScroll

**`Example`**

```ts
const ref = useRef();
const refScroll = useSroll(ref);
const scrollToTop = useCallback(() => refScroll({ top: 0, duration: 500 }))

return <div style={{ overflow: scroll }} ref={ref} onClick={scrolltoTop} />;
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ref` | `any` | The target element. |
| `baseOptions?` | `Object` |  |
| `baseOptions.duration` | `number` | Duration of the animation, in milliseconds |
| `baseOptions.easing` | `Function` | Easing function to use for the animation. |
| `baseOptions.left` | `number` | Target scrollLeft value. |
| `baseOptions.top` | `number` | Target scrollTop value. |

#### Returns

`Function`

#### Defined in

[hooks/useScroll.js:28](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useScroll.js#L28)
