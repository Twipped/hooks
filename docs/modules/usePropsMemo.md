# Module: usePropsMemo

## Table of contents

### Functions

- [default](usePropsMemo.md#default)

## Functions

### default

▸ **default**(`factory`, `props`, `options?`): `any`

Functionally identical to useMemo, except it takes a dependency object
instead of an array (presumably a components props argument).

**`Function`**

usePropsMemo

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `factory` | `Object` | Function to memoize |
| `factory.Function` | `any` | - |
| `props` | `any` | Dependencies |
| `options?` | `Object` | Options |
| `options.comparison` | `boolean` \| { `Function`: (`a`: `any`, `b`: `any`) => `any`  } | The comparison function used to detect if the dependencies change. Defaults to a shallow equal, pass true to use deep equality. |

#### Returns

`any`

The result of the factory function.

#### Defined in

[hooks/usePropsMemo.js:20](https://github.com/Twipped/hooks/blob/86a2b07/hooks/usePropsMemo.js#L20)
