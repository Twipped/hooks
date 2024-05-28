[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useMap()

> **useMap**(...`args`): `Map`\<`any`, `any`\>

Create and return a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
that triggers rerenders when it is updated.

## Parameters

• ...**args**: `any`[]

initial Map entries

## Returns

`Map`\<`any`, `any`\>

## Function

useMap

## Example

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

## Source

[hooks/useMap.js:56](https://github.com/Twipped/hooks/blob/main/hooks/useMap.js#L56)
