# Module: usePageFocus

## Table of contents

### Functions

- [default](usePageFocus.md#default)

## Functions

### default

▸ **default**(`options?`): `boolean`[]

State hook which tracks if the current window is focused.

**`Function`**

usePageFocus

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Object` |  |
| `options.onChange` | `Function` | Optional callback to be invoked when the state changes. |
| `options.ownerElementRef` | `any` | Ref of an element in the document to be monitored. |
| `options.update` | `boolean` | Controls if the component should update when the state changes. Defaults to true. |

#### Returns

`boolean`[]

Focus state, a function to focus the window, and a function to get the focus state.

#### Defined in

[hooks/usePageFocus.js:17](https://github.com/Twipped/hooks/blob/86a2b07/hooks/usePageFocus.js#L17)
