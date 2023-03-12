# Module: useWillMount

## Table of contents

### Functions

- [default](useWillMount.md#default)

## Functions

### default

▸ **default**(`onMount`, `onWillUnmount`): `any`

Executes the passed function only on mount, storing the result
and returning it during every render until unmounted.

**`Function`**

useWillMount

#### Parameters

| Name | Type |
| :------ | :------ |
| `onMount` | `Function` |
| `onWillUnmount` | `Function` |

#### Returns

`any`

Returns the result of the onMount function.

#### Defined in

[hooks/useWillMount.js:14](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useWillMount.js#L14)
