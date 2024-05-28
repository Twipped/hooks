[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useAsyncCallback()

> **useAsyncCallback**\<`T`\>(`callback`, `dependencies`): `T`

Identical to React.useCallback, except if the callback produces a promise,
we dispose of any resolved value and forward rejections to the console.

## Type parameters

• **T** *extends* `Function`

## Parameters

• **callback**: `T`

Callback function

• **dependencies**: `any`[]

Dependencies array

## Returns

`T`

## Function

useAsyncCallback

## Example

```ts
import { useState } from 'react';
import useAsyncCallback from '@zenbusiness/application-commons-hooks/useAsyncCallback';
import { fetchCompletions } from './fetchRequests.js';
const [completions, setCompletions] = useState([]);
const onKeyPress = useAsyncFunction(async (ev) => {
  const { value } = ev.target;
  const comps = await fetchCompletions(value);
  setCompletions(comps);
});
return (
  <datalist onKeyPress={onKeyPress}>
    {completions.map((c) => <option value={c} />}
  </datalist>
);
```

## Source

[hooks/useAsyncCallback.js:29](https://github.com/Twipped/hooks/blob/main/hooks/useAsyncCallback.js#L29)
