[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: filterChildren()

> **filterChildren**(`children`, `predicate`, `all`?): (`string` \| `number` \| `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\> \| `Iterable`\<`ReactNode`\> \| `ReactPortal`)[]

Iterates through children that are typically specified as `props.children`,
returning only the children where the predicate results in a truthy return.
By default this will ignore text nodes and non-component values

## Parameters

• **children**: `ReactNode` \| `ReactNode`[]

• **predicate**

• **all?**: `boolean`= `false`

Pass true to filter over all child elements, not just valid components

## Returns

(`string` \| `number` \| `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\> \| `Iterable`\<`ReactNode`\> \| `ReactPortal`)[]

## Source

[hooks/children.js:209](https://github.com/Twipped/hooks/blob/main/hooks/children.js#L209)
