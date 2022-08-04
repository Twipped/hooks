import { renderHook } from '@testing-library/react';
import useLazyRef from '../hooks/useLazyRef.js';

describe('useLazyRef', () => {
  it('set its value to the', () => {
    const { result } = renderHook(() => useLazyRef(() => 'Bob'));

    expect(result.current.current).toBe('Bob');
  });
});
