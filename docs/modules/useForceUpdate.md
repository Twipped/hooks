# Module: useForceUpdate

## Table of contents

### Functions

- [default](useForceUpdate.md#default)

## Functions

### default

▸ **default**(): `Function`

Returns a function that triggers a component update. the hook equivalent to
`this.forceUpdate()` in a class component. In most cases using a state value directly
is preferable but may be required in some advanced usages of refs for interop or
when direct DOM manipulation is required.

**`Function`**

useForceUpdate

**`Example`**

```ts
const forceUpdate = useForceUpdate();

const updateOnClick = useCallback(() => {
 forceUpdate()
}, [forceUpdate])

return <button type="button" onClick={updateOnClick}>Hi there</button>
```

#### Returns

`Function`

Returns a forceUpdate function.

#### Defined in

[hooks/useForceUpdate.js:21](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useForceUpdate.js#L21)
