[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useClock()

> **useClock**(...`ticks`): `Date`

Triggers a component refresh at each "tick" of the clock, determined by the interval checks
passed in to the arguments.

Interval Checks are functions which receive two dates (the last tick value and the current
time) and returns true if they are the same interval, false if they are in different intervals.

Multiple checks may be passed to tick at multiple intervals.

## Parameters

• ...**ticks**: `Function`[]

Interval Check functions

## Returns

`Date`

Returns the time of the last interval tick.

## Function

useClock

## Example

```ts
import useClock from '@zenbusiness/application-commons-hooks/useClock';
import { isSameSecond, isSameMinute, isSameHour } from 'date-fns';
useClock(isSameMinute) // ticks at the top of each minute
useClock(isSameHour) // ticks at the top of each hour
useClock(useClock.interval(differenceInSeconds, 30)) // ticks every 30 seconds
```

## Source

[hooks/useClock.js:24](https://github.com/Twipped/hooks/blob/main/hooks/useClock.js#L24)
