# Module: useMemoObject

## Table of contents

### Functions

- [default](useMemoObject.md#default)

## Functions

### default

▸ **default**(`obj`, `options?`): `any`

Memoizes a passed object so that the same object is always returned
as long as all of its properties are unchanged. This is useful for
objects passed as component props, so that child components will not re-render
because a parent component rendered and produced a new object. Most
notably, this is needed to prevent context providers from triggering
downstream updates every time they render.

**`Function`**

useMemoObject

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `any` | The object to memoize. |
| `options?` | `Object` | Options |
| `options.comparison` | `boolean` | The comparison function used to detect if the object properties change. Defaults to a shallow equal, pass true to use deep equality. |

#### Returns

`any`

The first instance of the object passed.

#### Defined in

[hooks/useMemoObject.js:19](https://github.com/Twipped/hooks/blob/f27aaa6/hooks/useMemoObject.js#L19)
