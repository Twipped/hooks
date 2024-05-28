
import { MutableRefObject } from 'react';
import type { RenderOptions, RenderResult } from './render.t.js';

import type { WaitForRefChangeOptions as WaitForNextUpdateOptions } from './waitForRefChange.js';
import type { Expand } from './expand'

export type RenderHookOptions = Expand<
  RenderOptions
  & {
    initialProps?: object;
    withRouter?: boolean
  }
>

export type RenderHookResult = Expand<
  RenderResult
  & {
    result: MutableRefObject<any>;
    rerender(props: object):void
    waitForNextUpdate(options: WaitForNextUpdateOptions): Promise<void>
  }
>
