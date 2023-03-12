# Module: useMemoMapped

## Table of contents

### Functions

- [default](useMemoMapped.md#default)

## Functions

### default

▸ **default**(`collection`, `predicate`): `any`

Memoizes the results of mapping a collection (array, object, map, set) per value,
thus if the collection is changed, only the values that change will be recomputed.

**`Function`**

useMemoMapped

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `collection` | `any` |  |
| `predicate` | `any` | A function or iteratee identity (key name, or truthy evaluating pairing) |

#### Returns

`any`

#### Defined in

[hooks/useMemoMapped.js:15](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useMemoMapped.js#L15)
