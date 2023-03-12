# Module: useCommittedRef

## Table of contents

### Type Aliases

- [Ref](useCommittedRef.md#ref)

### Functions

- [default](useCommittedRef.md#default)

## Type Aliases

### Ref

Ƭ **Ref**<\>: `Ref`

#### Defined in

[hooks/useCommittedRef.js:1](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useCommittedRef.js#L1)

## Functions

### default

▸ **default**(`value`): `any`

Creates a `Ref` whose value is updated in an effect, ensuring the most recent
value is the one rendered with. Generally only required for Concurrent mode usage
where previous work in `render()` may be discarded before being used.

This is safe to access in an event handler.

**`Function`**

useCommittedRef

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | The `Ref` value |

#### Returns

`any`

The committed value

#### Defined in

[hooks/useCommittedRef.js:16](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useCommittedRef.js#L16)
