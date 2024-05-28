import { renderHook } from './harness/index.js';
import useLazyRef from '../useLazyRef.js';

describe('useLazyRef', () => {
  it('set its value to the', () => {
    const { result } = renderHook(() => useLazyRef(() => 'Bob'));

    expect(result.current.current).toBe('Bob');
  });
});
