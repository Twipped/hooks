[**@twipped/hooks**](../../README.md) • **Docs**

***

# Function: useSuspense()

> **useSuspense**(`key`, `fn`): `any`

Performs an asynchronous task in a manner compatible with
the React Suspension API.

Note, if you don't know how Suspension works, you probably
shouldn't use this function.

This will execute the given function and throw the promise it
produces so that React.Suspense can await its completion, dismounting
your component while it completes. When the promise finishes,
React.Suspense will remount your component, invoking this function again.
At that point, this function returns the resolved value for the rest of
the life of the application.

## Parameters

• **key**: `string`

A name for this operation that is unique across
your entire application (including multiple instances of your component).

• **fn**: [`TaskCallback`](../type-aliases/TaskCallback.md)

The async task to perform.

## Returns

`any`

## Source

[hooks/useSuspense.js:53](https://github.com/Twipped/hooks/blob/main/hooks/useSuspense.js#L53)
