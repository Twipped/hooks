[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useSilentState()

> **useSilentState**(`initial`, `dependencies`): [`any`, `Function`, `Function`]

Identical to `useState` _except_ that it does not trigger an update when
the state is updated.

## Parameters

• **initial**: `any`= `null`

The initial value to set the state to.

• **dependencies**: `any`[]= `undefined`

A dependency array. If provided, the state
will be reset to the passed initial value if a dependency changes.

## Returns

[`any`, `Function`, `Function`]

A three item
array containing: state, setState, getState

## Function

useSilentState

## Source

[hooks/useSilentState.js:16](https://github.com/Twipped/hooks/blob/main/hooks/useSilentState.js#L16)
