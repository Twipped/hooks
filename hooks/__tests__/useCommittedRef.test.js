import { useEffect } from 'react';
import { renderHook } from './harness/index.js';
import useCommittedRef from '../useCommittedRef.js';

describe('useCommittedRef', () => {
  it('should use fresh value', () => {
    const spyA = jest.fn();
    const spyB = jest.fn();

    const { rerender } = renderHook(
      (fn) => {
        const fnRef = useCommittedRef(fn);

        useEffect(() => {
          fnRef.current();
        });
      },
      { initialProps: spyA }
    );

    rerender(spyB);

    expect(spyA).toHaveBeenCalledTimes(1);
    expect(spyB).toHaveBeenCalledTimes(1);
  });
});
