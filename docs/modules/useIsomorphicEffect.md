# Module: useIsomorphicEffect

## Table of contents

### Functions

- [default](useIsomorphicEffect.md#default)

## Functions

### default

▸ **default**(`effect`, `deps?`): `void`

Resolves to useEffect when "window" is not in scope and useLayoutEffect in the browser

**`Function`**

useIsomorphicEffect

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | `EffectCallback` |
| `deps?` | `DependencyList` |

#### Returns

`void`

#### Defined in

node_modules/@types/react/index.d.ts:1060
