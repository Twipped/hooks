[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useMergedRefs()

> **useMergedRefs**\<`T`\>(...`refs`): (`value`) => `void`

Creates a single callback ref composed from two other Refs.

## Type parameters

• **T**

## Parameters

• ...**refs**: [`Ref`](../type-aliases/Ref.md)\<`T`\>[]

Two or more callback or mutable Refs

## Returns

`Function`

### Parameters

• **value**: `T`

### Returns

`void`

## Function

useMergedRefs

## Example

```ts
const Button = React.forwardRef((props, ref) => {
  const [element, attachRef] = useCallbackRef<HTMLButtonElement>();
  const mergedRef = useMergedRefs(ref, attachRef);

  return <button ref={mergedRef} {...props}/>
})
```

## Source

[hooks/useMergedRefs.js:69](https://github.com/Twipped/hooks/blob/main/hooks/useMergedRefs.js#L69)
