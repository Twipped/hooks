import { MutableRefObject } from "react";

export type { EffectCallback } from "react"

export type Disposer = (run?: boolean) => void
export type Destructor = () => void;
export type AsyncDestructor = () => void | Promise<void>;
export type AsyncEffectCallback = () => Promise<void | AsyncDestructor>;
export type ComparisonCallback = (a: any, b: any) => boolean;
export type Comparison = boolean | ComparisonCallback;

export type Resolvable<T = any> = MutableRefObject<T> | ((value: any) => T)

export declare function RetrieveFn<S = any>(): S;
export type Retrieve<S = any> = typeof RetrieveFn<S>

export type DispatchOptions = {
  merge?: boolean,
  forceUpdate?: boolean
  immediate?: boolean
  defer?: boolean
  silent?: boolean
}

export declare function DispatchFn<S>(value: S | ((prevState: S) => S), options?: DispatchOptions): void;
export declare namespace DispatchFn {
  var reset: (options?: DispatchOptions) => void;
}

export type DispatchFnNs = {
  reset: (options?: DispatchOptions) => void;
}

export type Dispatch<S = any> = typeof DispatchFn<S> & DispatchFnNs

export type StateHookInterface<S = any> = [
  state: S,
  setState: Dispatch<S>,
  getState: Retrieve<S>,
];


export type WebStorageStateHookInterface<S = object|string|boolean|number> = [
  state: S,
  setState: (state: S) => void,
  getState: Retrieve<S>,
];


export type RAF = typeof requestAnimationFrame | typeof setTimeout;
export type CAF = typeof cancelAnimationFrame | typeof clearTimeout;

export type TimeoutHandlerSet =
  ((delayMs?: number, reset?: boolean) => void) |
  ((fn: () => void, delayMs?: number, reset?: boolean) => void)

export interface TimeoutHandler {
  (delayMs?: number, reset?: boolean): void
  (fn: () => void, delayMs?: number, reset?: boolean): void

  set: TimeoutHandler
  clear():void;
  readonly isActive: boolean;
}

export type IntervalHandler = {
  start: () => void
  stop: () => void
  readonly isActive: boolean;
};

export interface PromisedState<T = any> {
  /**
   * The resolved state
   */
  state: T

  /**
   * Is the promise unresolved.
   */
  loading: boolean

  /**
   * If the promise rejects or the factory throws, this will have the error.
   */
  error: null | Error

  /**
   * The most recent result of the promise
   */
  get: () => T

  /**
   * Overwrites the last promise state
   */
  set: (value: T) => void;

  /**
   * Clears the state and reruns the promise factory.
   */
  reset: () => void;

}
