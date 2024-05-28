[**@twipped/hooks**](../../README.md) • **Docs**

***

# Interface: SelectionProviderProps\<T\>

## Type parameters

• **T**

= any

## Properties

### children

> **children**: `ReactNode` \| (`context`) => `ReactNode`

#### Source

[hooks/SelectionContext.js:43](https://github.com/Twipped/hooks/blob/main/hooks/SelectionContext.js#L43)

***

### onChange()

> **onChange**: (`value`) => `void`

Callback to invoke with the value is changed

#### Parameters

• **value**: `T`[]

#### Returns

`void`

#### Source

[hooks/SelectionContext.js:42](https://github.com/Twipped/hooks/blob/main/hooks/SelectionContext.js#L42)

***

### value

> **value**: `T` \| `T`[]

The input and default selected value

#### Source

[hooks/SelectionContext.js:41](https://github.com/Twipped/hooks/blob/main/hooks/SelectionContext.js#L41)
