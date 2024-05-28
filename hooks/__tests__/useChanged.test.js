import { renderHook } from './harness/index.js';
import useChanged from '../useChanged.js';

describe('useChanged', () => {
  it('shallow comparison', () => {
    const { result, rerender } = renderHook((props) => useChanged(props), {
      initialProps: { name: 'Alice' },
    });

    const alice = result.current[0];
    expect(result.current[0]).toMatch(/\$!\w{8}/);
    expect(result.current[1]).toEqual(true);

    rerender({ name: 'Alice' });

    // the same value as a new object does not change the key
    expect(result.current[0]).toEqual(alice);
    expect(result.current[1]).toEqual(false);

    // a new value does produce a new key
    rerender({ name: 'Bob' });

    const bob = result.current[0];
    expect(bob).toMatch(/\$!\w{8}/);
    expect(bob).not.toEqual(alice);
    expect(result.current[1]).toEqual(true);

    rerender({ name: 'Alice' });

    // rendering back to Alice does not produce the value from before
    expect(result.current[0]).not.toEqual(alice);
    expect(result.current[1]).toEqual(true);
  });

  it('deep comparison - object', () => {
    const { result, rerender } = renderHook((props) => (
      useChanged(props, { comparison: true })
    ), {
      initialProps: { user: { name: 'Alice' }, type: 1 },
    });

    let previous = result.current[0];
    expect(result.current[0]).toMatch(/\$!\w{8}/);
    expect(result.current[1]).toEqual(true);

    // the same deep values as a new object should not change the key
    rerender({ user: { name: 'Alice' }, type: 1 });
    expect(result.current[0]).toEqual(previous);
    expect(result.current[1]).toEqual(false);

    // changing a value on the first layer should change the key
    rerender({ user: { name: 'Alice' }, type: 2 });
    expect(result.current[0]).not.toEqual(previous);
    expect(result.current[1]).toEqual(true);

    [ previous ] = result.current;

    // changing a value on the second layer should change the key
    rerender({ user: { name: 'Bob' }, type: 2 });
    expect(result.current[0]).not.toEqual(previous);
    expect(result.current[1]).toEqual(true);
  });

  it('shallow comparison - array', () => {
    const { result, rerender } = renderHook((props) => (
      useChanged(props.deps, { comparison: false })
    ), {
      initialProps: { deps: [ 'Alice' ] },
    });

    let previous = result.current[0];
    expect(result.current[0]).toMatch(/\$!\w{8}/);
    expect(result.current[1]).toEqual(true);

    // the same values in a new array should not change the key
    rerender({ deps: [ 'Alice' ] });
    expect(result.current[0]).toEqual(previous);
    expect(result.current[1]).toEqual(false);
    [ previous ] = result.current;

    // changing a value on the second layer should change the key
    rerender({ deps: [ 'Bob' ] });
    expect(result.current[0]).not.toEqual(previous);
    expect(result.current[1]).toEqual(true);
    [ previous ] = result.current;

    // New array length
    rerender({ deps: [ 'Alice', 'Bob' ] });
    expect(result.current[0]).not.toEqual(previous);
    expect(result.current[1]).toEqual(true);
    [ previous ] = result.current;
  });

  it('deep comparison - array', () => {
    const { result, rerender } = renderHook((props) => (
      useChanged(props.deps, { comparison: true })
    ), {
      initialProps: { deps: [ [ 'Alice' ], 'Alice' ] },
    });

    expect(result.current[0]).toMatch(/\$!\w{8}/);
    expect(result.current[1]).toEqual(true);
    let previous = result.current[0];

    // the same values in a new array should not change the key
    rerender({ deps: [ [ 'Alice' ], 'Bob' ] });
    expect(result.current[0]).not.toEqual(previous);
    expect(result.current[1]).toEqual(true);
    [ previous ] = result.current;

    // changing a value on the second layer should change the key
    rerender({ deps: [ [ 'Bob' ], 'Bob' ] });
    expect(result.current[0]).not.toEqual(previous);
    expect(result.current[1]).toEqual(true);
  });
});
