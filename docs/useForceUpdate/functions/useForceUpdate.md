[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useForceUpdate()

> **useForceUpdate**(): `Function`

Returns a function that triggers a component update. the hook equivalent to
`this.forceUpdate()` in a class component. In most cases using a state value directly
is preferable but may be required in some advanced usages of refs for interop or
when direct DOM manipulation is required.

## Returns

`Function`

Returns a forceUpdate function.

## Function

useForceUpdate

## Example

```ts
const forceUpdate = useForceUpdate();

const updateOnClick = useCallback(() => {
 forceUpdate()
}, [forceUpdate])

return <button type="button" onClick={updateOnClick}>Hi there</button>
```

## Source

[hooks/useForceUpdate.js:20](https://github.com/Twipped/hooks/blob/main/hooks/useForceUpdate.js#L20)
