[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useCommittedRef()

> **useCommittedRef**\<`T`\>(`value`): `MutableRefObject`\<`T`\>

Creates a `Ref` whose value is updated in an effect, ensuring the most recent
value is the one rendered with. Generally only required for Concurrent mode usage
where previous work in `render()` may be discarded before being used.

This is safe to access in an event handler.

## Type parameters

• **T**

## Parameters

• **value**: `any`

The `Ref` value

## Returns

`MutableRefObject`\<`T`\>

## Example

```ts
import { useCallback } from 'react';
import useCommittedRef from '@zenbusiness/application-commons-hooks/useCommittedRef';
function MyComponent ({ someProp }) {
  const somePropRef = useCommittedRef(someProp);
  const onClick = useCallback(() => {
    const safePropRef = somePropRef.current;
  }, []); // no dependency needed
  return <button onClick={onClick}>Click Me!</button>;
}
```

## Source

[hooks/useCommittedRef.js:25](https://github.com/Twipped/hooks/blob/main/hooks/useCommittedRef.js#L25)
