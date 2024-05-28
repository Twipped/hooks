[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useTimeout()

> **useTimeout**(`fn`?): [`TimeoutHandler`](../interfaces/TimeoutHandler.md)

Returns a controller object for setting a timeout that is properly cleaned up
once the component unmounts. New timeouts cancel and replace existing ones.

## Parameters

• **fn?**

A base function for the timeout.

## Returns

[`TimeoutHandler`](../interfaces/TimeoutHandler.md)

## Function

useTimeout

## Example

```ts
const { set, clear } = useTimeout();
const [hello, showHello] = useState(false);

//Display hello after 5 seconds
set(() => showHello(true), 5000);
return (
  <div className="App">
    {hello ? <h3>Hello</h3> : null}
  </div>
);
```

## Source

[hooks/useTimeout.js:24](https://github.com/Twipped/hooks/blob/main/hooks/useTimeout.js#L24)
