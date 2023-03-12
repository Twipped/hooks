# Module: useChosenOne

## Table of contents

### Interfaces

- [ChosenStatus](../interfaces/useChosenOne.ChosenStatus.md)

### Functions

- [default](useChosenOne.md#default)

## Functions

### default

▸ **default**(`channel`): [`ChosenStatus`](../interfaces/useChosenOne.ChosenStatus.md)

Tracks component instantiation and reports if the current component is the
first and/or last instance of the component. Useful for fullscreen effects such
as backdrops where you do not want multiple instances.

**`Function`**

useChosenOne

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channel` | `string` \| `symbol` | The name/category of the component to be tracked. |

#### Returns

[`ChosenStatus`](../interfaces/useChosenOne.ChosenStatus.md)

#### Defined in

[hooks/useChosenOne.js:103](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useChosenOne.js#L103)
