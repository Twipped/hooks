[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useGettableState()

> **useGettableState**\<`S`\>(`initial`, `options`?): `StateHookInterface`\<`S`\>

Functions identical to useState, except the state is retrievable
via a callback passed as the third return element. This always returns
the current state regardless of where we are in the render process.

## Type parameters

• **S**

## Parameters

• **initial**: `S`

Default value passed to useState

• **options?**= `{}`

Options

• **options.alwaysDefer?**: `boolean`= `false`

All updates are deferred to the next event loop,
allowing updates during the render. Strongly recommended that this is used in conjunction
with `alwaysUpdate=false`

• **options.alwaysImmediate?**: `boolean`= `false`

Update the state store instantly when the
setter function is called, as opposed to waiting for a refresh.

• **options.alwaysMerge?**: `boolean`= `false`

Always merge the new state into the old.

• **options.alwaysUpdate?**: `boolean`= `true`

Always trigger an update even if state matches.
Passing false to this option will cause it to only update if state actually changes.

• **options.comparison?**: `boolean` \| `Function`= `false`

} When alwaysUpdate is false,
the comparison function provided will evaluate if the new state differs from the old state.
Pass true to perform a deep equal, otherwise the comparison will be shallow.

## Returns

`StateHookInterface`\<`S`\>

A three item
array containing: state, setState, getState

## Function

useGettableState

## Source

[hooks/useGettableState.js:33](https://github.com/Twipped/hooks/blob/main/hooks/useGettableState.js#L33)
