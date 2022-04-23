import { jest } from '@jest/globals';
import { useEffect } from 'react';
import { renderHook } from '@testing-library/react';
import { useCommittedRef } from '../index';

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
