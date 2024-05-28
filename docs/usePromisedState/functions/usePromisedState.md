[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: usePromisedState()

> **usePromisedState**(`fn`, `dependencies`, `options`?): `PromisedState`\<`any`\>

Creates a state hook populated by a value produced by a promise returning function.
If the dependencies change, the function will be re-run, and IF the results differ then the state will be updated.
Invoking setState.reset() will re-evaluate the function and force update with the results.
Note: State will always be empty at initial invocation until the promise resolves.

## Parameters

• **fn**: `Function`

Handler to run at initialization and when a dependency changes

• **dependencies**: `any`[]= `[]`

A dependency array

• **options?**= `{}`

• **options.comparison?**: [`Comparison`](../../useAsyncEffect/type-aliases/Comparison.md)= `false`

A function to evaluate if the result of the handler differs from current state

• **options.initial?**: `any`= `DEFAULT`

Default value of the state before first fetch.

• **options.skipFirst?**: `boolean`= `false`

Should the state me fetched on first render

## Returns

`PromisedState`\<`any`\>

## Function

usePromisedState

## Source

[hooks/usePromisedState.js:34](https://github.com/Twipped/hooks/blob/main/hooks/usePromisedState.js#L34)
