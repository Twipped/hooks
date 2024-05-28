[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useDerivedState()

> **useDerivedState**\<`S`\>(`fn`, `dependencies`, `options`?): `StateHookInterface`\<`S`\>

Creates a state hook populated by a value derived from dependencies.
If the dependencies change, the state will be repopulated based on the
new dependencies, IF the results differ.
Invoking setState.reset() will change the state back to the last derived value.

## Type parameters

• **S**

## Parameters

• **fn**

Handler to run at initialization and when a dependency changes

• **dependencies**: `any`= `undefined`

A dependency array

• **options?**= `{}`

• **options.alwaysDefer?**: `boolean`

All updates are deferred to the next event loop,
allowing updates during the render. Strongly recommended that this is used in conjunction
with `alwaysUpdate=false`

• **options.alwaysImmediate?**: `boolean`

Update the state store instantly when the
setter function is called, as opposed to waiting for a refresh.

• **options.alwaysMerge?**: `boolean`

Always merge the new state into the old.

• **options.alwaysUpdate?**: `boolean`

Always trigger an update even if state matches.

• **options.comparator?**: `boolean` \| (`a`, `b`) => `boolean`= `shallowEqual`

A function
to evaluate if the result of the handler differs from current state. Pass true to perform
a deep equal, otherwise the comparison will be shallow.

• **options.comparison?**: `boolean` \| (`a`, `b`) => `boolean`

} When alwaysUpdate
is false, the comparison function provided will evaluate if the new state differs from the
old state. Pass true to perform a deep equal, otherwise the comparison will be shallow.

## Returns

`StateHookInterface`\<`S`\>

A three item
array containing: state, setState, getState

## Function

useDerivedState

## Source

[hooks/useDerivedState.js:36](https://github.com/Twipped/hooks/blob/main/hooks/useDerivedState.js#L36)
