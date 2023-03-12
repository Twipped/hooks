# Module: useComponentPosition

## Table of contents

### Interfaces

- [Position](../interfaces/useComponentPosition.Position.md)

### Type Aliases

- [Ref](useComponentPosition.md#ref)

### Functions

- [default](useComponentPosition.md#default)

## Type Aliases

### Ref

Ƭ **Ref**<\>: `Ref`

#### Defined in

[hooks/useComponentPosition.js:10](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useComponentPosition.js#L10)

## Functions

### default

▸ **default**(`ref`, `onUpdate?`): [`Position`](../interfaces/useComponentPosition.Position.md)

Retrieves the current page position of the element Ref passed.

**`Function`**

useComponentPosition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ref` | `any` | React ref (from createRef or useRef) that will contain an element reference. |
| `onUpdate?` | `Function` | Optional function to fire when the position changes. |

#### Returns

[`Position`](../interfaces/useComponentPosition.Position.md)

`top` and `left` properties, relative to the top left of the document. `width` and `height` of the element.

#### Defined in

[hooks/useComponentPosition.js:28](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useComponentPosition.js#L28)
