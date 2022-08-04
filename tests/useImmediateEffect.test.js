import { useEffect } from 'react';
import { render, renderHook } from '@testing-library/react';
import useImmediateEffect from '../hooks/useImmediateEffect.js';

describe('useImmediateEffect', () => {
  it('triggers synchronously within the render', () => {
    const hookSpy = jest.fn();
    const postSpy = jest.fn();
    const effectSpy = jest.fn();

    function Component ({ name }) {
      useEffect(effectSpy);
      useImmediateEffect(hookSpy, [ name ]);
      postSpy();
    }

    const { rerender } = render(<Component name="Alice" />);

    expect(hookSpy).toHaveBeenCalledTimes(1);
    expect(hookSpy).toHaveBeenCalledBefore(postSpy);
    expect(postSpy).toHaveBeenCalledBefore(effectSpy);

    jest.clearAllMocks();
    rerender(<Component name="Alice" />);

    expect(hookSpy).not.toHaveBeenCalled();
    expect(postSpy).toHaveBeenCalledBefore(effectSpy);

    jest.clearAllMocks();
    rerender(<Component name="Bob" />);

    expect(hookSpy).toHaveBeenCalledTimes(1);
    expect(hookSpy).toHaveBeenCalledBefore(postSpy);
    expect(postSpy).toHaveBeenCalledBefore(effectSpy);
  });

  it('triggers the returned function when it re-invokes or unmounts', () => {
    const spy = jest.fn();

    const { rerender, unmount } = renderHook(({ name }) => (
      useImmediateEffect(() => spy, [ name ])
    ), {
      initialProps: { name: 'Alice' },
    });

    expect(spy).not.toHaveBeenCalled();

    rerender({ name: 'Alice' });

    expect(spy).not.toHaveBeenCalled();

    rerender({ name: 'Bob' });

    expect(spy).toHaveBeenCalledTimes(1);

    unmount();

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('does not invoke at mount if skipMount is true', () => {
    const spy = jest.fn();

    const { rerender } = renderHook(({ name }) => (
      useImmediateEffect(spy, [ name ], { skipMount: true })
    ), {
      initialProps: { name: 'Alice' },
    });

    expect(spy).not.toHaveBeenCalled();

    rerender({ name: 'Alice' });

    expect(spy).not.toHaveBeenCalled();

    rerender({ name: 'Bob' });

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
