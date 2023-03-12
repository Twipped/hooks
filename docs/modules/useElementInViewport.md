# Module: useElementInViewport

## Table of contents

### Type Aliases

- [Ref](useElementInViewport.md#ref)

### Functions

- [default](useElementInViewport.md#default)

## Type Aliases

### Ref

Ƭ **Ref**<\>: `Ref`

#### Defined in

[hooks/useElementInViewport.js:2](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useElementInViewport.js#L2)

## Functions

### default

▸ **default**(`elementRef`, `options`): `boolean`

Tests if a given Ref element exists within a given viewport.

**`Function`**

useElementInViewport

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elementRef` | `any` | Ref to the relevant element. |
| `options` | `Object` |  |
| `options.root` | `any` | The element that is used as the viewport for checking visibility of the target. Defaults to the browser viewport. |
| `options.rootMargin` | `string` | Margin to draw around the root element for detecting overlap. Identical to CSS `margin` definition. Defaults to 0 on all sides. |
| `options.threshold` | `number` | How much of the target element must be on screen to be considered visible, from 0 to 1. |

#### Returns

`boolean`

#### Defined in

[hooks/useElementInViewport.js:15](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useElementInViewport.js#L15)
