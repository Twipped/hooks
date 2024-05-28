[**@twipped/hooks**](../../README.md) • **Docs**

***

# Interface: SelectionContextObject\<T\>

## Type parameters

• **T**

= any

## Properties

### addSelection()

> **addSelection**: (`value`) => `void`

#### Parameters

• **value**: `T`

#### Returns

`void`

#### Source

[hooks/SelectionContext.js:19](https://github.com/Twipped/hooks/blob/main/hooks/SelectionContext.js#L19)

***

### clearSelection()

> **clearSelection**: () => `void`

#### Returns

`void`

#### Source

[hooks/SelectionContext.js:18](https://github.com/Twipped/hooks/blob/main/hooks/SelectionContext.js#L18)

***

### deleteSelection()

> **deleteSelection**: (`value`) => `void`

#### Parameters

• **value**: `T`

#### Returns

`void`

#### Source

[hooks/SelectionContext.js:20](https://github.com/Twipped/hooks/blob/main/hooks/SelectionContext.js#L20)

***

### getSelection()

> **getSelection**: () => `T`[]

#### Returns

`T`[]

#### Source

[hooks/SelectionContext.js:17](https://github.com/Twipped/hooks/blob/main/hooks/SelectionContext.js#L17)

***

### hasSelection()

> **hasSelection**: (`value`) => `boolean`

#### Parameters

• **value**: `T`

#### Returns

`boolean`

#### Source

[hooks/SelectionContext.js:16](https://github.com/Twipped/hooks/blob/main/hooks/SelectionContext.js#L16)

***

### selection

> **selection**: `T`[]

#### Source

[hooks/SelectionContext.js:14](https://github.com/Twipped/hooks/blob/main/hooks/SelectionContext.js#L14)

***

### setSelection()

> **setSelection**: (`value`) => `void`

#### Parameters

• **value**: `T` \| `T`[]

#### Returns

`void`

#### Source

[hooks/SelectionContext.js:15](https://github.com/Twipped/hooks/blob/main/hooks/SelectionContext.js#L15)

***

### toggleSelection()

> **toggleSelection**: (`value`, `enabled`?) => `void`

#### Parameters

• **value**: `T`

• **enabled?**: `boolean`

#### Returns

`void`

#### Source

[hooks/SelectionContext.js:21](https://github.com/Twipped/hooks/blob/main/hooks/SelectionContext.js#L21)
