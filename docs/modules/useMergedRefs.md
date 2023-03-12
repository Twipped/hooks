# Module: useMergedRefs

## Table of contents

### Functions

- [assignRef](useMergedRefs.md#assignref)
- [default](useMergedRefs.md#default)
- [mergeRefs](useMergedRefs.md#mergerefs)

## Functions

### assignRef

▸ `Private` **assignRef**(`ref`, `value`): `void`

Assigns a value to a given ref object or function.

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | [`Ref`](../interfaces/typedefs.Ref.md) |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[hooks/useMergedRefs.js:12](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useMergedRefs.js#L12)

___

### default

▸ **default**(`...refs`): `Function`

Creates a single callback ref composed from two other Refs.

**`Function`**

useMergedRefs

**`Example`**

```ts
const Button = React.forwardRef((props, ref) => {
  const [element, attachRef] = useCallbackRef<HTMLButtonElement>();
  const mergedRef = useMergedRefs(ref, attachRef);

  return <button ref={mergedRef} {...props}/>
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...refs` | [`Ref`](../interfaces/typedefs.Ref.md)[] | Two or more callback or mutable Refs |

#### Returns

`Function`

#### Defined in

[hooks/useMergedRefs.js:52](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useMergedRefs.js#L52)

___

### mergeRefs

▸ `Private` **mergeRefs**(`...refs`): `Function`

Combines multiple ref objects or functions under a single assignable ref function

#### Parameters

| Name | Type |
| :------ | :------ |
| `...refs` | [`Ref`](../interfaces/typedefs.Ref.md)[] |

#### Returns

`Function`

#### Defined in

[hooks/useMergedRefs.js:31](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useMergedRefs.js#L31)
