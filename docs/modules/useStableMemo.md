# Module: useStableMemo

## Table of contents

### Functions

- [default](useStableMemo.md#default)

## Functions

### default

▸ **default**(`factory`, `dependencies`, `options?`): `any`

Identical to `useMemo` _except_ that it provides a semantic guarantee that
values will not be invalidated unless the dependencies change. This is unlike
the built in `useMemo` which may discard memoized values for performance reasons.

useStableMemo also provides the ability to perform a deep equality check on dependencies,
and also allows you pass an object as the dependencies value.

**`Function`**

useStableMemo

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `factory` | `Function` | A function that returns a value to be memoized |
| `dependencies` | `any` | A dependency array or object |
| `options?` | `Object` | Options |
| `options.comparison` | `boolean` \| `Function` | The comparison function used to detect if the dependencies change. Defaults to a shallow equal, pass true to use deep equality. |

#### Returns

`any`

#### Defined in

[hooks/useStableMemo.js:22](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useStableMemo.js#L22)
