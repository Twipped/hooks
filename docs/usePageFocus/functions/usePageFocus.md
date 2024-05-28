[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: usePageFocus()

> **usePageFocus**(`options`?): [`boolean`, () => `void`, () => `boolean`]

State hook which tracks if the current window is focused.

## Parameters

• **options?**= `{}`

• **options.onChange?**: `Function`

Optional callback to be invoked when the state changes.

• **options.ownerElementRef?**: `MutableRefObject`\<`Element`\>

Ref of an element in the document to be monitored.

• **options.update?**: `boolean`= `true`

Controls if the component should update when the state changes. Defaults to true.

## Returns

[`boolean`, () => `void`, () => `boolean`]

Focus state, a function to focus the window, and a function to get the focus state.

## Function

usePageFocus

## Source

[hooks/usePageFocus.js:17](https://github.com/Twipped/hooks/blob/main/hooks/usePageFocus.js#L17)
