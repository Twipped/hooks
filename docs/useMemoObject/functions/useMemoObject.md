[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useMemoObject()

> **useMemoObject**\<`T`\>(`obj`, `options`?): `T`

Memoizes a passed object so that the same object is always returned
as long as all of its properties are unchanged. This is useful for
objects passed as component props, so that child components will not re-render
because a parent component rendered and produced a new object. Most
notably, this is needed to prevent context providers from triggering
downstream updates every time they render.

## Type parameters

• **T**

## Parameters

• **obj**: `T`

The object to memoize.

• **options?**

Options

• **options.comparison?**: `boolean`

The comparison function used to detect if
the object properties change. Defaults to a shallow equal, pass true to use deep equality.

## Returns

`T`

The first instance of the object passed.

## Function

useMemoObject

## Source

[hooks/useMemoObject.js:19](https://github.com/Twipped/hooks/blob/main/hooks/useMemoObject.js#L19)
