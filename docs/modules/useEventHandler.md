# Module: useEventHandler

## Table of contents

### Type Aliases

- [EventHandlerInterface](useEventHandler.md#eventhandlerinterface)

### Functions

- [default](useEventHandler.md#default)
- [useEventHandlerOn](useEventHandler.md#useeventhandleron)

## Type Aliases

### EventHandlerInterface

Ƭ **EventHandlerInterface**<\>: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attach` | { `Function`: (`target`: `HTMLElement`) => `any`  } |
| `attach.Function` | [object Object] |
| `remove` | `Function` |

#### Defined in

[hooks/useEventHandler.js:11](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useEventHandler.js#L11)

## Functions

### default

▸ **default**(`event`, `listener`, `capture?`): [`EventHandlerInterface`](useEventHandler.md#eventhandlerinterface)

Attaches an event handler to a specified DOM element, bypassing the react synthetic event system.
Handler is automatically cleaned up when the calling component unmounts.

**`Function`**

useEventHandler

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `event` | `string` | `undefined` | Name of the DOM event to listen for. |
| `listener` | `Function` | `undefined` | An event handler |
| `capture?` | `boolean` | `false` | Whether or not to listen during the capture event phase |

#### Returns

[`EventHandlerInterface`](useEventHandler.md#eventhandlerinterface)

The attachment interface

#### Defined in

[hooks/useEventHandler.js:37](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useEventHandler.js#L37)

___

### useEventHandlerOn

▸ **useEventHandlerOn**(`ref`, `event`, `listener`, `capture?`): `void`

Functions identical to useEventHandler, but takes a React Ref object as its first argument

**`Function`**

useEventHandlerOn

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ref` | `any` | `undefined` | Target ref to attach to, when ready. |
| `event` | `string` | `undefined` | Name of the DOM event to listen for. |
| `listener` | `Function` | `undefined` | An event handler |
| `capture` | `boolean` | `false` | Whether or not to listen during the capture event phase |

#### Returns

`void`

#### Defined in

[hooks/useEventHandler.js:77](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useEventHandler.js#L77)
