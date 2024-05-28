import {
  renderHook,
} from './harness/index.js';
import useStableMemo from '../useStableMemo.js';

describe('useStableMemo', () => {
  it('primitives', () => {
    let step = 0;
    const factory = jest.fn(() => { step += 1; return step; });
    const { result, rerender } = renderHook(({ deps }) => useStableMemo(factory, deps), {
      initialProps: { deps: 'foo' },
    });

    expect(factory).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(1);

    // dependencies do not change
    rerender({ deps: 'foo' });
    expect(factory).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(1);

    // dependencies changes
    rerender({ deps: 'bar' });
    expect(factory).toHaveBeenCalledTimes(2);
    expect(result.current).toEqual(2);

    // change to number
    rerender({ deps: 2 });
    expect(factory).toHaveBeenCalledTimes(3);
    expect(result.current).toEqual(3);

    // change to another number
    rerender({ deps: 0 });
    expect(factory).toHaveBeenCalledTimes(4);
    expect(result.current).toEqual(4);

    // change to boolean
    rerender({ deps: true });
    expect(factory).toHaveBeenCalledTimes(5);
    expect(result.current).toEqual(5);

    // change to false
    rerender({ deps: false });
    expect(factory).toHaveBeenCalledTimes(6);
    expect(result.current).toEqual(6);
  });

  it('arrays', () => {
    let step = 0;
    const factory = jest.fn(() => { step += 1; return step; });
    const { result, rerender } = renderHook(({ deps }) => useStableMemo(factory, deps), {
      initialProps: { deps: [ 1, 2, 3 ] },
    });

    expect(factory).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(1);

    // dependencies do not change
    rerender({ deps: [ 1, 2, 3 ] });
    expect(factory).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(1);

    // item in array changes
    rerender({ deps: [ 1, 4, 3 ] });
    expect(factory).toHaveBeenCalledTimes(2);
    expect(result.current).toEqual(2);

    // array length changes
    rerender({ deps: [ 1, 4, 3, 5 ] });
    expect(factory).toHaveBeenCalledTimes(3);
    expect(result.current).toEqual(3);
  });

  it('objects - shallow comparison', () => {
    let step = 0;
    const factory = jest.fn(() => { step += 1; return step; });
    const { result, rerender } = renderHook(({ deps }) => useStableMemo(factory, deps), {
      initialProps: { deps: { a: 'a' } },
    });

    expect(factory).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(1);

    // dependencies do not change
    rerender({ deps: { a: 'a' } });
    expect(factory).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(1);

    // shallow value changes
    rerender({ deps: { a: 'b' } });
    expect(factory).toHaveBeenCalledTimes(2);
    expect(result.current).toEqual(2);

    // sanity check
    rerender({ deps: { a: 'b' } });
    expect(factory).toHaveBeenCalledTimes(2);
    expect(result.current).toEqual(2);

    // shallow key changes
    rerender({ deps: { b: 'b' } });
    expect(factory).toHaveBeenCalledTimes(3);
    expect(result.current).toEqual(3);

    const a = { b: 'b' };

    // nested object added
    rerender({ deps: { a } });
    expect(factory).toHaveBeenCalledTimes(4);
    expect(result.current).toEqual(4);

    // rerender with same object does not update
    rerender({ deps: { a } });
    expect(factory).toHaveBeenCalledTimes(4);
    expect(result.current).toEqual(4);

    // rerender with new object of same value causes update because memory reference
    rerender({ deps: { a: { b: 'b' } } });
    expect(factory).toHaveBeenCalledTimes(5);
    expect(result.current).toEqual(5);
  });

  it('objects - deep comparison', () => {
    let step = 0;
    const factory = jest.fn(() => { step += 1; return step; });
    const { result, rerender } = renderHook(({ deps }) => (
      useStableMemo(factory, deps, { comparison: true })
    ), {
      initialProps: { deps: { a: 'a' } },
    });

    expect(factory).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(1);

    // dependencies do not change
    rerender({ deps: { a: 'a' } });
    expect(factory).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(1);

    // shallow value changes
    rerender({ deps: { a: 'b' } });
    expect(factory).toHaveBeenCalledTimes(2);
    expect(result.current).toEqual(2);

    // sanity check
    rerender({ deps: { a: 'b' } });
    expect(factory).toHaveBeenCalledTimes(2);
    expect(result.current).toEqual(2);

    // shallow key changes
    rerender({ deps: { b: 'b' } });
    expect(factory).toHaveBeenCalledTimes(3);
    expect(result.current).toEqual(3);

    const a = { b: 'b' };

    // nested object added
    rerender({ deps: { a } });
    expect(factory).toHaveBeenCalledTimes(4);
    expect(result.current).toEqual(4);

    // rerender with same object does not update
    rerender({ deps: { a } });
    expect(factory).toHaveBeenCalledTimes(4);
    expect(result.current).toEqual(4);

    // rerender with new object of same value DOES NOT cause update because deep comparison
    rerender({ deps: { a: { b: 'b' } } });
    expect(factory).toHaveBeenCalledTimes(4);
    expect(result.current).toEqual(4);
  });
});
