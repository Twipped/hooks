[**@twipped/hooks**](../../README.md) • **Docs**

***

# Class: HookedMap

## Extends

- `Map`

## Constructors

### new HookedMap()

> **new HookedMap**(`listener`, ...`args`): [`HookedMap`](HookedMap.md)

#### Parameters

• **listener**: `any`

• ...**args**: `any`[]

#### Returns

[`HookedMap`](HookedMap.md)

#### Overrides

`Map.constructor`

#### Source

[hooks/useMap.js:6](https://github.com/Twipped/hooks/blob/main/hooks/useMap.js#L6)

## Properties

### \[toStringTag\]

> `readonly` **\[toStringTag\]**: `string`

#### Inherited from

`Map.[toStringTag]`

#### Source

node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:137

***

### listener

> **listener**: `any`

#### Source

[hooks/useMap.js:9](https://github.com/Twipped/hooks/blob/main/hooks/useMap.js#L9)

***

### size

> `readonly` **size**: `number`

#### Inherited from

`Map.size`

#### Source

node\_modules/typescript/lib/lib.es2015.collection.d.ts:45

***

### \[species\]

> `static` `readonly` **\[species\]**: `MapConstructor`

#### Inherited from

`Map.[species]`

#### Source

node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:319

## Methods

### `[iterator]`()

> **\[iterator\]**(): `IterableIterator`\<[`any`, `any`]\>

Returns an iterable of entries in the map.

#### Returns

`IterableIterator`\<[`any`, `any`]\>

#### Inherited from

`Map.[iterator]`

#### Source

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:119

***

### clear()

> **clear**(): `void`

#### Returns

`void`

#### Overrides

`Map.clear`

#### Source

[hooks/useMap.js:26](https://github.com/Twipped/hooks/blob/main/hooks/useMap.js#L26)

***

### delete()

> **delete**(`key`): `boolean`

#### Parameters

• **key**: `any`

#### Returns

`boolean`

#### Overrides

`Map.delete`

#### Source

[hooks/useMap.js:20](https://github.com/Twipped/hooks/blob/main/hooks/useMap.js#L20)

***

### entries()

> **entries**(): `IterableIterator`\<[`any`, `any`]\>

Returns an iterable of key, value pairs for every entry in the map.

#### Returns

`IterableIterator`\<[`any`, `any`]\>

#### Inherited from

`Map.entries`

#### Source

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:124

***

### forEach()

> **forEach**(`callbackfn`, `thisArg`?): `void`

Executes a provided function once per each key/value pair in the Map, in insertion order.

#### Parameters

• **callbackfn**

• **thisArg?**: `any`

#### Returns

`void`

#### Inherited from

`Map.forEach`

#### Source

node\_modules/typescript/lib/lib.es2015.collection.d.ts:28

***

### get()

> **get**(`key`): `any`

Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.

#### Parameters

• **key**: `any`

#### Returns

`any`

Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.

#### Inherited from

`Map.get`

#### Source

node\_modules/typescript/lib/lib.es2015.collection.d.ts:33

***

### has()

> **has**(`key`): `boolean`

#### Parameters

• **key**: `any`

#### Returns

`boolean`

boolean indicating whether an element with the specified key exists or not.

#### Inherited from

`Map.has`

#### Source

node\_modules/typescript/lib/lib.es2015.collection.d.ts:37

***

### keys()

> **keys**(): `IterableIterator`\<`any`\>

Returns an iterable of keys in the map

#### Returns

`IterableIterator`\<`any`\>

#### Inherited from

`Map.keys`

#### Source

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:129

***

### set()

> **set**(`key`, `value`): [`HookedMap`](HookedMap.md)

#### Parameters

• **key**: `any`

• **value**: `any`

#### Returns

[`HookedMap`](HookedMap.md)

#### Overrides

`Map.set`

#### Source

[hooks/useMap.js:12](https://github.com/Twipped/hooks/blob/main/hooks/useMap.js#L12)

***

### values()

> **values**(): `IterableIterator`\<`any`\>

Returns an iterable of values in the map

#### Returns

`IterableIterator`\<`any`\>

#### Inherited from

`Map.values`

#### Source

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:134

***

### groupBy()

> `static` **groupBy**\<`K`, `T`\>(`items`, `keySelector`): `Map`\<`K`, `T`[]\>

Groups members of an iterable according to the return value of the passed callback.

#### Type parameters

• **K**

• **T**

#### Parameters

• **items**: `Iterable`\<`T`\>

An iterable.

• **keySelector**

A callback which will be invoked for each item in items.

#### Returns

`Map`\<`K`, `T`[]\>

#### Inherited from

`Map.groupBy`

#### Source

node\_modules/typescript/lib/lib.esnext.collection.d.ts:25
