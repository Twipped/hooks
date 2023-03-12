# Module: useSet

## Table of contents

### Classes

- [HookedSet](../classes/useSet.HookedSet.md)

### Functions

- [default](useSet.md#default)

## Functions

### default

▸ **default**(`...args`): `Set`<`any`\>

Create and return a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
that triggers rerenders when it's updated.

**`Function`**

useSet

**`Example`**

```ts
const ids = useSet([1,2,3,4]);

return (
 <>
   {Array.from(ids, id => (
     <div>
       id: {id}. <button onClick={() => ids.delete(id)}>X</button>
     </div>
   )}
 </>
)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `any`[] | initial Set values |

#### Returns

`Set`<`any`\>

#### Defined in

[hooks/useSet.js:52](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useSet.js#L52)
