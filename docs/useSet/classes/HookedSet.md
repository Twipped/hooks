[**@twipped/hooks**](../../README.md) • **Docs**

***

# Class: HookedSet

## Extends

- `Set`

## Constructors

### new HookedSet()

> **new HookedSet**(`listener`, ...`args`): [`HookedSet`](HookedSet.md)

#### Parameters

• **listener**: `any`

• ...**args**: `any`[]

#### Returns

[`HookedSet`](HookedSet.md)

#### Overrides

`Set.constructor`

#### Source

[hooks/useSet.js:6](https://github.com/Twipped/hooks/blob/main/hooks/useSet.js#L6)

## Properties

### \[toStringTag\]

> `readonly` **\[toStringTag\]**: `string`

#### Inherited from

`Set.[toStringTag]`

#### Source

node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:145

***

### listener

> **listener**: `any`

#### Source

[hooks/useSet.js:9](https://github.com/Twipped/hooks/blob/main/hooks/useSet.js#L9)

***

### size

> `readonly` **size**: `number`

#### Inherited from

`Set.size`

#### Source

node\_modules/typescript/lib/lib.es2015.collection.d.ts:112

***

### \[species\]

> `static` `readonly` **\[species\]**: `SetConstructor`

#### Inherited from

`Set.[species]`

#### Source

node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:322

## Methods

### `[iterator]`()

> **\[iterator\]**(): `IterableIterator`\<`any`\>

Iterates over values in the set.

#### Returns

`IterableIterator`\<`any`\>

#### Inherited from

`Set.[iterator]`

#### Source

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:170

***

### add()

> **add**(`value`): [`HookedSet`](HookedSet.md)

#### Parameters

• **value**: `any`

#### Returns

[`HookedSet`](HookedSet.md)

#### Overrides

`Set.add`

#### Source

[hooks/useSet.js:12](https://github.com/Twipped/hooks/blob/main/hooks/useSet.js#L12)

***

### clear()

> **clear**(): `void`

#### Returns

`void`

#### Overrides

`Set.clear`

#### Source

[hooks/useSet.js:26](https://github.com/Twipped/hooks/blob/main/hooks/useSet.js#L26)

***

### delete()

> **delete**(`value`): `boolean`

#### Parameters

• **value**: `any`

#### Returns

`boolean`

#### Overrides

`Set.delete`

#### Source

[hooks/useSet.js:20](https://github.com/Twipped/hooks/blob/main/hooks/useSet.js#L20)

***

### entries()

> **entries**(): `IterableIterator`\<[`any`, `any`]\>

Returns an iterable of [v,v] pairs for every value `v` in the set.

#### Returns

`IterableIterator`\<[`any`, `any`]\>

#### Inherited from

`Set.entries`

#### Source

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:174

***

### forEach()

> **forEach**(`callbackfn`, `thisArg`?): `void`

Executes a provided function once per each value in the Set object, in insertion order.

#### Parameters

• **callbackfn**

• **thisArg?**: `any`

#### Returns

`void`

#### Inherited from

`Set.forEach`

#### Source

node\_modules/typescript/lib/lib.es2015.collection.d.ts:104

***

### has()

> **has**(`value`): `boolean`

#### Parameters

• **value**: `any`

#### Returns

`boolean`

a boolean indicating whether an element with the specified value exists in the Set or not.

#### Inherited from

`Set.has`

#### Source

node\_modules/typescript/lib/lib.es2015.collection.d.ts:108

***

### keys()

> **keys**(): `IterableIterator`\<`any`\>

Despite its name, returns an iterable of the values in the set.

#### Returns

`IterableIterator`\<`any`\>

#### Inherited from

`Set.keys`

#### Source

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:178

***

### values()

> **values**(): `IterableIterator`\<`any`\>

Returns an iterable of values in the set.

#### Returns

`IterableIterator`\<`any`\>

#### Inherited from

`Set.values`

#### Source

node\_modules/typescript/lib/lib.es2015.iterable.d.ts:183
