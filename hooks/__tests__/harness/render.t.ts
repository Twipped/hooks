import { BoundFunction } from '@testing-library/dom'
import type userEvent from '@testing-library/user-event';
import { Options as UserEventOptions } from '@testing-library/user-event';

/**
 * Expands type definitions so that vscode/typedoc shows the real interface
 * instead of the combination of generics, joins and omits that produced it.
 */
export type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

import type {
  RenderResult as TLRenderResult,
  RenderOptions as TLRenderOptions
} from '@testing-library/react';
import { JSXElementConstructor, ReactElement } from 'react';

export interface RenderOptions {
  container?: TLRenderOptions["container"];
  baseElement?: TLRenderOptions["baseElement"];
  hydrate?: false | undefined;
  wrapper?: Wrapper;
  onError?: (err: Error) => void;
  firstErrorOnly?: boolean;
  userEventOptions?: UserEventOptions;
  strictMode?: boolean;
  [props: string]: any;
}

export type RenderResult = Expand<
  {
    setProps (props: object): RenderResult;
    forceUpdate(): RenderResult;
    checkErrors(): void
    getErrors():Array<Error>
  }
  & TLRenderResult
  & typeof userEvent
>


export type Wrapper = JSXElementConstructor<{
  children: ReactElement;
  [props: string]: any;
}>
