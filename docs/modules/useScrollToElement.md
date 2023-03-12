# Module: useScrollToElement

## Table of contents

### Variables

- [DEFAULT\_DURATION](useScrollToElement.md#default_duration)

### Functions

- [default](useScrollToElement.md#default)

## Variables

### DEFAULT\_DURATION

• `Const` **DEFAULT\_DURATION**: ``480``

#### Defined in

[hooks/useScrollToElement.js:9](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useScrollToElement.js#L9)

## Functions

### default

▸ **default**(`options?`): `Object`

Provides a mechanism to smoothly scroll to the target element.

**`Function`**

useScrollToElement

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` |  |
| `options.auto` | `HTMLElement` \| `RefObject`<`HTMLElement`\> | If given an element or ref, will automatically scroll to that element the moment it becomes available. |
| `options.delay` | `number` | Milliseconds to pause until starting to scroll |
| `options.duration` | `number` | Duration of the scroll animation, in milliseconds |
| `options.easing` | `Object` | Easing function for the animation. Defaults to ease-in-out-quad https://easings.net/#easeInOutQuad |
| `options.easing.Function` | (`input`: `number`) => `number` | - |
| `options.offsetLeft` | `number` \| { `Function`: (`delta`: ``1`` \| ``-1``) => `any`  } | Offset delta from the left edge of the component, in pixels. May also be a function that is invoked at start of scroll, receiving 1 or -1 to indicate scroll direction. |
| `options.offsetTop` | `number` \| { `Function`: (`delta`: ``1`` \| ``-1``) => `any`  } | Offset delta from the top edge of the component, in pixels. May also be a function that is invoked at start of scroll, receiving 1 or -1 to indicate scroll direction. |

#### Returns

`Object`

Returns a callback that receives a target element.

| Name | Type |
| :------ | :------ |
| `Function` | (`target`: `HTMLElement`) => `any` |

#### Defined in

[hooks/useScrollToElement.js:77](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useScrollToElement.js#L77)
