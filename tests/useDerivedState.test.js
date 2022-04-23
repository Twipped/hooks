import { act, render, renderHook } from '@testing-library/react';
import { useDerivedState } from '../index';

describe('useDerivedState', () => {
  it('resets state when the dependencies change', () => {
    const { result, rerender } = renderHook(({ name }) => (
      useDerivedState(() => name, [ name ])
    ), {
      initialProps: { name: 'Alice' },
    });

    let state = result.current[0];
    const setState = result.current[1];
    const getState = result.current[2];

    expect(state).toBe('Alice');
    expect(getState()).toBe('Alice');

    act(() => { setState('Bob'); });
    rerender({ name: 'Alice' });

    [ state ] = result.current;
    expect(state).toBe('Bob');
    expect(getState()).toBe('Bob');

    act(() => rerender({ name: 'Tom' }));

    [ state ] = result.current;
    expect(state).toBe('Tom');
    expect(getState()).toBe('Tom');
  });

  it('does not trigger an update if the derived value is the same', () => {
    const factorySpy = jest.fn().mockImplementation(() => 'Foo');
    const renderSpy = jest.fn();
    let state,
      setState;

    /**
     * @param root0
     * @param root0.name
     */
    function Component ({ name }) {
      [ state, setState ] = useDerivedState(factorySpy, [ name ]);
      renderSpy();
    }

    const { rerender } = render(<Component name="Alice" />);

    expect(factorySpy).toHaveBeenCalledTimes(1);
    expect(renderSpy).toHaveBeenCalledTimes(1);
    expect(state).toBe('Foo');

    rerender(<Component name="Alice" />);

    expect(factorySpy).toHaveBeenCalledTimes(1);
    expect(renderSpy).toHaveBeenCalledTimes(2);
    expect(state).toBe('Foo');

    rerender(<Component name="Bob" />);

    expect(factorySpy).toHaveBeenCalledTimes(2);
    expect(renderSpy).toHaveBeenCalledTimes(3);
    expect(state).toBe('Foo');

    act(() => { setState('Bob'); });
    expect(factorySpy).toHaveBeenCalledTimes(2);
    expect(renderSpy).toHaveBeenCalledTimes(4);
    expect(state).toBe('Bob');

    rerender(<Component name="Tom" />);
    expect(factorySpy).toHaveBeenCalledTimes(3);
    expect(renderSpy).toHaveBeenCalledTimes(6);
    expect(state).toBe('Foo');
  });

  it('does trigger an update if the derived value differs', () => {
    let derivationValue = 1;
    const factorySpy = jest.fn().mockImplementation(() => derivationValue);
    const renderSpy = jest.fn();
    let state,
      setState;

    /**
     * @param root0
     * @param root0.name
     */
    function Component ({ name }) {
      [ state, setState ] = useDerivedState(factorySpy, [ name ]);
      renderSpy();
    }

    const { rerender } = render(<Component name="Alice" />);

    expect(factorySpy).toHaveBeenCalledTimes(1);
    expect(renderSpy).toHaveBeenCalledTimes(1);
    expect(state).toBe(1);

    rerender(<Component name="Alice" />);

    expect(factorySpy).toHaveBeenCalledTimes(1);
    expect(renderSpy).toHaveBeenCalledTimes(2);
    expect(state).toBe(1);

    rerender(<Component name="Bob" />);

    expect(factorySpy).toHaveBeenCalledTimes(2);
    expect(renderSpy).toHaveBeenCalledTimes(3);
    expect(state).toBe(1);

    act(() => { setState('Bob'); });
    expect(factorySpy).toHaveBeenCalledTimes(2);
    expect(renderSpy).toHaveBeenCalledTimes(4);
    expect(state).toBe('Bob');

    derivationValue = 2;
    rerender(<Component name="Tom" />);
    expect(factorySpy).toHaveBeenCalledTimes(3);
    expect(renderSpy).toHaveBeenCalledTimes(6);
    expect(state).toBe(2);
  });
});
