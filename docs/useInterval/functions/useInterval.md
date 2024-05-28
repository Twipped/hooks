[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useInterval()

> **useInterval**(`fn`, `interval`): [`IntervalHandler`](../type-aliases/IntervalHandler.md)

Creates an interval timer that is properly cleaned up when a component is unmounted

## Parameters

• **fn**

A function run on each interval

• **interval**: `number`

The milliseconds duration of the interval.
Pass 0 to loop on animation frames.

## Returns

[`IntervalHandler`](../type-aliases/IntervalHandler.md)

## Function

useInterval

## Example

```ts
const [timer, setTimer] = useState(-1)
 useInterval(() => setTimer(i => i + 1), 1000, false, true)

 // will update to 0 on the first effect
 return <span>{timer} seconds past</span>
```

## Source

[hooks/useInterval.js:22](https://github.com/Twipped/hooks/blob/main/hooks/useInterval.js#L22)
