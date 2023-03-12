# Module: useChildren

## Table of contents

### Functions

- [childDescender](useChildren.md#childdescender)
- [default](useChildren.md#default)

## Functions

### childDescender

▸ `Private` **childDescender**(`children`): `any`

Recursively iterates over the child structure, one child at a time.

**`Yields`**

The current child

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `children` | `Object` | The react `children` property |
| `children.count` | (`children`: `any`) => `number` | - |
| `children.forEach` | <C\>(`children`: `C` \| readonly `C`[], `fn`: (`child`: `C`, `index`: `number`) => `void`) => `void` | - |
| `children.map` | <T, C\>(`children`: `C` \| readonly `C`[], `fn`: (`child`: `C`, `index`: `number`) => `T`) => `C` extends ``null`` ? `C` : `Exclude`<`T`, `boolean`\>[] | - |
| `children.only` | <C\>(`children`: `C`) => `C` extends `any`[] ? `never` : `C` | - |
| `children.toArray` | (`children`: `ReactNode` \| `ReactNode`[]) => (`string` \| `number` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> \| `ReactFragment` \| `ReactPortal`)[] | - |

#### Returns

`any`

#### Defined in

[hooks/useChildren.js:13](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useChildren.js#L13)

___

### default

▸ **default**(`children`, `factory`, `options?`): `any`

Works much like useMemo, except based upon the component child structure.
Memoizes deeply against all descendant properties.

**`Function`**

useChildren

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `children` | `Object` | The react `children` property |
| `children.count` | (`children`: `any`) => `number` | - |
| `children.forEach` | <C\>(`children`: `C` \| readonly `C`[], `fn`: (`child`: `C`, `index`: `number`) => `void`) => `void` | - |
| `children.map` | <T, C\>(`children`: `C` \| readonly `C`[], `fn`: (`child`: `C`, `index`: `number`) => `T`) => `C` extends ``null`` ? `C` : `Exclude`<`T`, `boolean`\>[] | - |
| `children.only` | <C\>(`children`: `C`) => `C` extends `any`[] ? `never` : `C` | - |
| `children.toArray` | (`children`: `ReactNode` \| `ReactNode`[]) => (`string` \| `number` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> \| `ReactFragment` \| `ReactPortal`)[] | - |
| `factory` | `Function` | The function to evaluate at mount and whenever children changes. |
| `options` | `Object` |  |
| `options.comparison` | `boolean` | The comparison function used to detect if the dependencies change. Defaults to a shallow equal, pass true to use deep equality. |

#### Returns

`any`

The last return value of the factory.

#### Defined in

[hooks/useChildren.js:58](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useChildren.js#L58)
