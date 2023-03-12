# Module: useAsyncCallback

## Table of contents

### Functions

- [default](useAsyncCallback.md#default)

## Functions

### default

▸ **default**(`callback`, `dependencies`): `Function`

Identical to React.useCallback, except if the callback produces a promise,
we dispose of any resolved value and forward rejections to the console.

**`Function`**

useAsyncCallback

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | `Function` | Callback function |
| `dependencies` | `any`[] | Dependencies array |

#### Returns

`Function`

#### Defined in

[hooks/useAsyncCallback.js:13](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useAsyncCallback.js#L13)
