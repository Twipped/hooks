# Module: useGlobalListener

## Table of contents

### Type Aliases

- [GlobalListenerInterface](useGlobalListener.md#globallistenerinterface)
- [Truthy](useGlobalListener.md#truthy)

### Functions

- [default](useGlobalListener.md#default)
- [useDocumentEventListener](useGlobalListener.md#usedocumenteventlistener)
- [useToggledGlobalListener](useGlobalListener.md#usetoggledgloballistener)
- [useWindowEventListener](useGlobalListener.md#usewindoweventlistener)

## Type Aliases

### GlobalListenerInterface

Ƭ **GlobalListenerInterface**<\>: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attach` | { `Function`: `void`  } |
| `attach.Function` | `void` |
| `remove` | { `Function`: `void`  } |
| `remove.Function` | `void` |
| `when` | { `Function`: (`value`: `any`) => `void`  } |
| `when.Function` | [object Object] |

#### Defined in

[hooks/useGlobalListener.js:16](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useGlobalListener.js#L16)

___

### Truthy

Ƭ **Truthy**<\>: `any`

#### Defined in

[hooks/useGlobalListener.js:8](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useGlobalListener.js#L8)

## Functions

### default

▸ **default**(`eventName`, `listener`, `capture?`, `ownerElementRef?`): `void`

Attaches an event handler outside directly to the `document`,
bypassing the react synthetic event system.

**`Function`**

useGlobalListener

**`Example`**

```ts
useGlobalListener('keydown', (event) => {
 console.log(event.key)
});
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `eventName` | `string` | `undefined` | Name of the DOM event to listen for. |
| `listener` | `Function` | `undefined` | An event handler |
| `capture?` | `boolean` | `false` | Whether or not to listen during the capture event phase |
| `ownerElementRef?` | `HTMLElement` \| `RefObject`<`HTMLElement`\> | `null` | Ref to element to listen to instead of document |

#### Returns

`void`

#### Defined in

[hooks/useGlobalListener.js:53](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useGlobalListener.js#L53)

___

### useDocumentEventListener

▸ **useDocumentEventListener**(`eventName`, `listener`, `capture?`): `void`

Shortcut for useGlobalListener against the document

**`Function`**

useDocumentEventListener

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | Event to listen for |
| `listener` | `Function` | Callback function |
| `capture?` | `boolean` | Capture events from the top of the DOM tree |

#### Returns

`void`

#### Defined in

[hooks/useGlobalListener.js:184](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useGlobalListener.js#L184)

___

### useToggledGlobalListener

▸ **useToggledGlobalListener**(`eventName`, `listener`, `capture?`, `ownerElementRef?`): [`GlobalListenerInterface`](useGlobalListener.md#globallistenerinterface)

Similar to useGlobalListener, but only binds to the target when told to.
Returns an object containing `remove`, `attach`, and `when` functions.
`when` will attach as long as the provided value is truthy.

**`Function`**

useToggledGlobalListener

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `eventName` | `string` | `undefined` | Name of the DOM event to listen for. |
| `listener` | `Function` | `undefined` | An event handler |
| `capture?` | `boolean` | `false` | Whether or not to listen during the capture event phase |
| `ownerElementRef?` | `HTMLElement` \| `RefObject`<`HTMLElement`\> | `null` | Ref of an element in the document to be bound to. |

#### Returns

[`GlobalListenerInterface`](useGlobalListener.md#globallistenerinterface)

#### Defined in

[hooks/useGlobalListener.js:106](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useGlobalListener.js#L106)

___

### useWindowEventListener

▸ **useWindowEventListener**(`eventName`, `listener`, `capture?`): `void`

Shortcut for useGlobalListener against the window

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | Event to listen for |
| `listener` | `Function` | Callback function |
| `capture?` | `boolean` | Capture events from the top of the DOM tree |

#### Returns

`void`

#### Defined in

[hooks/useGlobalListener.js:171](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useGlobalListener.js#L171)
