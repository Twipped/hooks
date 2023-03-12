# Module: useTripWire

## Table of contents

### Functions

- [default](useTripWire.md#default)

## Functions

### default

▸ **default**(`value`): [state: boolean, reset: Function]

Returns false as long as the passed value remains falsy. Once the value becomes
truthy, the return will also become truthy and remain so until reset.

**`Function`**

useTripWire

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | The triggering value. |

#### Returns

[state: boolean, reset: Function]

Returns an array containing the current
value and a function to reset to false.

#### Defined in

[hooks/useTripWire.js:13](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useTripWire.js#L13)
