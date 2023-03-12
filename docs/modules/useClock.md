# Module: useClock

## Table of contents

### Namespaces

- [default](useClock.default.md)

### Variables

- [INTERVAL\_DAYS](useClock.md#interval_days)
- [INTERVAL\_HOURS](useClock.md#interval_hours)
- [INTERVAL\_MINUTES](useClock.md#interval_minutes)
- [INTERVAL\_SECONDS](useClock.md#interval_seconds)

### Functions

- [DAYS](useClock.md#days)
- [HOURS](useClock.md#hours)
- [MINUTES](useClock.md#minutes)
- [SECONDS](useClock.md#seconds)
- [default](useClock.md#default)

## Variables

### INTERVAL\_DAYS

• `Const` **INTERVAL\_DAYS**: `Function`

#### Defined in

[hooks/useClock.js:24](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useClock.js#L24)

___

### INTERVAL\_HOURS

• `Const` **INTERVAL\_HOURS**: `Function`

#### Defined in

[hooks/useClock.js:23](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useClock.js#L23)

___

### INTERVAL\_MINUTES

• `Const` **INTERVAL\_MINUTES**: `Function`

#### Defined in

[hooks/useClock.js:22](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useClock.js#L22)

___

### INTERVAL\_SECONDS

• `Const` **INTERVAL\_SECONDS**: `Function`

#### Defined in

[hooks/useClock.js:21](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useClock.js#L21)

## Functions

### DAYS

▸ **DAYS**(`dateLeft`, `dateRight`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dateLeft` | `number` \| `Date` |
| `dateRight` | `number` \| `Date` |

#### Returns

`boolean`

#### Defined in

node_modules/date-fns/typings.d.ts:713

___

### HOURS

▸ **HOURS**(`dateLeft`, `dateRight`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dateLeft` | `number` \| `Date` |
| `dateRight` | `number` \| `Date` |

#### Returns

`boolean`

#### Defined in

node_modules/date-fns/typings.d.ts:716

___

### MINUTES

▸ **MINUTES**(`dateLeft`, `dateRight`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dateLeft` | `number` \| `Date` |
| `dateRight` | `number` \| `Date` |

#### Returns

`boolean`

#### Defined in

node_modules/date-fns/typings.d.ts:734

___

### SECONDS

▸ **SECONDS**(`dateLeft`, `dateRight`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dateLeft` | `number` \| `Date` |
| `dateRight` | `number` \| `Date` |

#### Returns

`boolean`

#### Defined in

node_modules/date-fns/typings.d.ts:752

___

### default

▸ **default**(`...checks`): `Date`

Triggers a component refresh at the interval checks passed in to the arguments.
Interval Checks are functions which compare the last tick value against the current
time and returns true if they have NOT changed within the interval, false
if they are in different intervals. Multiple checks may be passed to trigger at
different intervals.

**`Function`**

useClock

**`Example`**

```ts
useClock(useClock.INTERVAL_SECONDS(10)) // ticks every ten seconds
useClock(useClock.INTERVAL_MINUTES(30)) // ticks every 30 minutes
useClock(useClock.INTERVAL_HOURS(2)) // ticks every 2 hours
useClock(useClock.SECONDS) // ticks once per second
useClock(useClock.MINUTES) // ticks at the top of each minute
useClock(useClock.HOURS) // ticks at the top of each hour
useClock(useClock.DAYS) // ticks at midnight
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...checks` | `Function`[] | Interval Check functions |

#### Returns

`Date`

Returns the time of the last interval tick.

#### Defined in

[hooks/useClock.js:60](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useClock.js#L60)
