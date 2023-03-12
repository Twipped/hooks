# Module: useLazyRef

## Table of contents

### Type Aliases

- [Ref](useLazyRef.md#ref)

### Functions

- [default](useLazyRef.md#default)

## Type Aliases

### Ref

Ƭ **Ref**<\>: `Ref`

#### Defined in

[hooks/useLazyRef.js:4](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useLazyRef.js#L4)

## Functions

### default

▸ **default**(`fn`): `any`

Exactly the same as `useRef` except it accepts a function to produce the initial value.
Useful when the default is relatively costly to construct.

**`Function`**

useLazyRef

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | `any` | A function to execute on ref initialization. |

#### Returns

`any`

#### Defined in

[hooks/useLazyRef.js:14](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useLazyRef.js#L14)
