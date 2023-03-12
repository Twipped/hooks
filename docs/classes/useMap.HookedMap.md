# Class: HookedMap

[useMap](../modules/useMap.md).HookedMap

## Hierarchy

- `Map`

  ↳ **`HookedMap`**

## Table of contents

### Constructors

- [constructor](useMap.HookedMap.md#constructor)

### Properties

- [[toStringTag]](useMap.HookedMap.md#[tostringtag])
- [listener](useMap.HookedMap.md#listener)
- [size](useMap.HookedMap.md#size)
- [[species]](useMap.HookedMap.md#[species])

### Methods

- [[iterator]](useMap.HookedMap.md#[iterator])
- [clear](useMap.HookedMap.md#clear)
- [delete](useMap.HookedMap.md#delete)
- [entries](useMap.HookedMap.md#entries)
- [forEach](useMap.HookedMap.md#foreach)
- [get](useMap.HookedMap.md#get)
- [has](useMap.HookedMap.md#has)
- [keys](useMap.HookedMap.md#keys)
- [set](useMap.HookedMap.md#set)
- [values](useMap.HookedMap.md#values)

## Constructors

### constructor

• **new HookedMap**(`listener`, `...args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `listener` | `any` |
| `...args` | `any`[] |

#### Overrides

Map.constructor

#### Defined in

[hooks/useMap.js:6](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useMap.js#L6)

## Properties

### [toStringTag]

• `Readonly` **[toStringTag]**: `string`

#### Inherited from

Map.\_\_@toStringTag@23

#### Defined in

node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:135

___

### listener

• **listener**: `any`

#### Defined in

[hooks/useMap.js:9](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useMap.js#L9)

___

### size

• `Readonly` **size**: `number`

#### Inherited from

Map.size

#### Defined in

node_modules/typescript/lib/lib.es2015.collection.d.ts:48

___

### [species]

▪ `Static` `Readonly` **[species]**: `MapConstructor`

#### Inherited from

Map.\_\_@species@596

#### Defined in

node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:317

## Methods

### [iterator]

▸ **[iterator]**(): `IterableIterator`<[`any`, `any`]\>

Returns an iterable of entries in the map.

#### Returns

`IterableIterator`<[`any`, `any`]\>

#### Inherited from

Map.\_\_@iterator@83

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:121

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Overrides

Map.clear

#### Defined in

[hooks/useMap.js:26](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useMap.js#L26)

___

### delete

▸ **delete**(`...args`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Overrides

Map.delete

#### Defined in

[hooks/useMap.js:20](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useMap.js#L20)

___

### entries

▸ **entries**(): `IterableIterator`<[`any`, `any`]\>

Returns an iterable of key, value pairs for every entry in the map.

#### Returns

`IterableIterator`<[`any`, `any`]\>

#### Inherited from

Map.entries

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:126

___

### forEach

▸ **forEach**(`callbackfn`, `thisArg?`): `void`

Executes a provided function once per each key/value pair in the Map, in insertion order.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callbackfn` | (`value`: `any`, `key`: `any`, `map`: `Map`<`any`, `any`\>) => `void` |
| `thisArg?` | `any` |

#### Returns

`void`

#### Inherited from

Map.forEach

#### Defined in

node_modules/typescript/lib/lib.es2015.collection.d.ts:31

___

### get

▸ **get**(`key`): `any`

Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `any` |

#### Returns

`any`

Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.

#### Inherited from

Map.get

#### Defined in

node_modules/typescript/lib/lib.es2015.collection.d.ts:36

___

### has

▸ **has**(`key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `any` |

#### Returns

`boolean`

boolean indicating whether an element with the specified key exists or not.

#### Inherited from

Map.has

#### Defined in

node_modules/typescript/lib/lib.es2015.collection.d.ts:40

___

### keys

▸ **keys**(): `IterableIterator`<`any`\>

Returns an iterable of keys in the map

#### Returns

`IterableIterator`<`any`\>

#### Inherited from

Map.keys

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:131

___

### set

▸ **set**(`...args`): [`HookedMap`](useMap.HookedMap.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

[`HookedMap`](useMap.HookedMap.md)

#### Overrides

Map.set

#### Defined in

[hooks/useMap.js:12](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useMap.js#L12)

___

### values

▸ **values**(): `IterableIterator`<`any`\>

Returns an iterable of values in the map

#### Returns

`IterableIterator`<`any`\>

#### Inherited from

Map.values

#### Defined in

node_modules/typescript/lib/lib.es2015.iterable.d.ts:136
