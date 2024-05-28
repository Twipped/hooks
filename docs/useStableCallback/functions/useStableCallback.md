[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useStableCallback()

> **useStableCallback**(`fn`, `dependencies`, `options`): `Function`

Identical to `useCallback` _except_ that it provides a semantic guarantee that
function will not be invalidated unless the dependencies change. Dependencies may
be an array or an object.

## Parameters

• **fn**: `Function`

A function that returns a value to be memoized

• **dependencies**: `any`[]

A dependency array

• **options**

• **options.comparison**: `boolean` \| `Function`= `false`

The comparison function used to detect if
the dependencies change. Defaults to a shallow equal, pass true to use deep equality.

## Returns

`Function`

## Function

useStableCallback

## Source

[hooks/useStableCallback.js:19](https://github.com/Twipped/hooks/blob/main/hooks/useStableCallback.js#L19)
