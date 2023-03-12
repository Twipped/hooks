# Module: useMap

## Table of contents

### Classes

- [HookedMap](../classes/useMap.HookedMap.md)

### Functions

- [default](useMap.md#default)

## Functions

### default

▸ **default**(`...args`): `Map`<`any`, `any`\>

Create and return a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
that triggers rerenders when it is updated.

**`Function`**

useMap

**`Example`**

```ts
const customerAges = useMap<number>([
  ['john', 24],
  ['betsy', 25]
]);

return (
 <>
   {Array.from(ids, ([name, age]) => (
     <div>
       {name}: {age}. <button onClick={() => ids.delete(name)}>X</button>
     </div>
   )}
 </>
)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `any`[] | initial Map entries |

#### Returns

`Map`<`any`, `any`\>

#### Defined in

[hooks/useMap.js:56](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useMap.js#L56)
