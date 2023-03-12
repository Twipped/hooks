# Module: useUpdateEffect

## Table of contents

### Functions

- [default](useUpdateEffect.md#default)

## Functions

### default

▸ **default**(`effect`, `dependencies`): `void`

Runs an effect *only* when the dependencies have changed, skipping the
initial "on mount" run. Caution, if the dependency list never changes,
the effect is **never run**

**`Function`**

useUpdateEffect

**`Example`**

```ts
js
 const ref = useRef<HTMLInput>(null);

 // focuses an element only if the focus changes, and not on mount
 useUpdateEffect(() => {
   const element = ref.current?.children[focusedIdx] as HTMLElement

   element?.focus()

 }, [focusedIndex])
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `effect` | `Function` | An effect to run on mount |
| `dependencies` | `any`[] |  |

#### Returns

`void`

#### Defined in

[hooks/useUpdateEffect.js:24](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useUpdateEffect.js#L24)
