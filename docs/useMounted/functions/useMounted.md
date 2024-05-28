[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useMounted()

> **useMounted**(): `Function`

Track whether a component is current mounted. Generally less preferable than
properly canceling effects so they don't run after a component is unmounted,
but helpful in cases where that isn't feasible, such as a `Promise` resolution.

## Returns

`Function`

Function that returns the current isMounted state of the component

## Function

useMounted

## Example

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

## Source

[hooks/useMounted.js:23](https://github.com/Twipped/hooks/blob/main/hooks/useMounted.js#L23)
