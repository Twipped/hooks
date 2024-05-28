[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useSet()

> **useSet**(...`args`): `Set`\<`any`\>

Create and return a [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
that triggers rerenders when it's updated.

## Parameters

• ...**args**: `any`[]

initial Set values

## Returns

`Set`\<`any`\>

## Function

useSet

## Example

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

## Source

[hooks/useSet.js:52](https://github.com/Twipped/hooks/blob/main/hooks/useSet.js#L52)
