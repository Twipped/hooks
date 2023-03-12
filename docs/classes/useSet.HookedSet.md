# Class: HookedSet

[useSet](../modules/useSet.md).HookedSet

## Hierarchy

- `Set`

  ↳ **`HookedSet`**

## Table of contents

### Constructors

- [constructor](useSet.HookedSet.md#constructor)

### Properties

- [[toStringTag]](useSet.HookedSet.md#[tostringtag])
- [listener](useSet.HookedSet.md#listener)
- [size](useSet.HookedSet.md#size)
- [[species]](useSet.HookedSet.md#[species])

### Methods

- [[iterator]](useSet.HookedSet.md#[iterator])
- [add](useSet.HookedSet.md#add)
- [clear](useSet.HookedSet.md#clear)
- [delete](useSet.HookedSet.md#delete)
- [entries](useSet.HookedSet.md#entries)
- [forEach](useSet.HookedSet.md#foreach)
- [has](useSet.HookedSet.md#has)
- [keys](useSet.HookedSet.md#keys)
- [values](useSet.HookedSet.md#values)

## Constructors

### constructor

• **new HookedSet**(`listener`, `...args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | `any` |
| `...args` | `any`[] |

#### Overrides

Set.constructor

#### Defined in

[hooks/useSet.js:6](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useSet.js#L6)

## Properties

### [toStringTag]

• `Readonly` **[toStringTag]**: `string`

#### Inherited from

Set.\_\_@toStringTag@23

#### Defined in

node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:143

___

### listener

• **listener**: `any`

#### Defined in

[hooks/useSet.js:9](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useSet.js#L9)

___

### size

• `Readonly` **size**: `number`

#### Inherited from

Set.size

#### Defined in

node_modules/typescript/lib/lib.es2015.collection.d.ts:115

___

### [species]

▪ `Static` `Readonly` **[species]**: `SetConstructor`

#### Inherited from

Set.\_\_@species@596

#### Defined in

node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:320

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`<`any`\>

Iterates over values in the set.

#### Returns

`IterableIterator`<`any`\>

#### Inherited from

Set.\_\_@iterator@83

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:172

___

### add

▸ **add**(`value`): [`HookedSet`](useSet.HookedSet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

[`HookedSet`](useSet.HookedSet.md)

#### Overrides

Set.add

#### Defined in

[hooks/useSet.js:12](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useSet.js#L12)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Overrides

Set.clear

#### Defined in

[hooks/useSet.js:26](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useSet.js#L26)

___

### delete

▸ **delete**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Overrides

Set.delete

#### Defined in

[hooks/useSet.js:20](https://github.com/Twipped/hooks/blob/86a2b07/hooks/useSet.js#L20)

___

### entries

▸ **entries**(): `IterableIterator`<[`any`, `any`]\>

Returns an iterable of [v,v] pairs for every value `v` in the set.

#### Returns

`IterableIterator`<[`any`, `any`]\>

#### Inherited from

Set.entries

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:176

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Executes a provided function once per each value in the Set object, in insertion order.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callbackfn` | (`value`: `any`, `value2`: `any`, `set`: `Set`<`any`\>) => `void` |
| `thisArg?` | `any` |

#### Returns

`void`

#### Inherited from

Set.forEach

#### Defined in

node_modules/typescript/lib/lib.es2015.collection.d.ts:107

___

### has

▸ **has**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

a boolean indicating whether an element with the specified value exists in the Set or not.

#### Inherited from

Set.has

#### Defined in

node_modules/typescript/lib/lib.es2015.collection.d.ts:111

___

### keys

▸ **keys**(): `IterableIterator`<`any`\>

Despite its name, returns an iterable of the values in the set.

#### Returns

`IterableIterator`<`any`\>

#### Inherited from

Set.keys

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:180

___

### values

▸ **values**(): `IterableIterator`<`any`\>

Returns an iterable of values in the set.

#### Returns

`IterableIterator`<`any`\>

#### Inherited from

Set.values

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:185
