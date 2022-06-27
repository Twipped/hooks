import 'global-jsdom/register';
import { test } from 'tap';
import { renderHook } from '@testing-library/react';
import usePrevious from './usePrevious.js';

test('should always return previous state after each update', async (t) => {
  const { result, rerender, unmount } = renderHook((props) => usePrevious(props.state), {
    initialProps: { state: 0 },
  });

  t.equal(result.current, undefined, 'first execute should be undefined');

  rerender({ state: 2 });
  t.equal(result.current, 0, 'second render shows first value');

  rerender({ state: 4 });
  t.equal(result.current, 2, 'third render shows second value');

  unmount();
});

test('accepts an initial value', async (t) => {
  const { result, rerender } = renderHook((props) => usePrevious(props.state, 10), {
    initialProps: { state: 0 },
  });

  t.equal(result.current, 10, 'first execute should be undefined');

  rerender({ state: 2 });
  t.equal(result.current, 0, 'second render shows first value');

  rerender({ state: 4 });
  t.equal(result.current, 2, 'third render shows second value');
});
