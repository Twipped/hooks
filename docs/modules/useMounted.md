# Module: useMounted

## Table of contents

### Functions

- [default](useMounted.md#default)

## Functions

### default

▸ **default**(): `Function`

Track whether a component is current mounted. Generally less preferable than
properly canceling effects so they don't run after a component is unmounted,
but helpful in cases where that isn't feasible, such as a `Promise` resolution.

**`Function`**

useMounted

**`Example`**

```ts
js
const [data, setData] = useState(null)
const isMounted = useMounted()

useEffect(() => {
  fetchdata().then((newData) => {
     if (isMounted()) {
       setData(newData);
     }
  })
})
```

#### Returns

`Function`

Function that returns the current isMounted state of the component

#### Defined in

[hooks/useMounted.js:23](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useMounted.js#L23)
