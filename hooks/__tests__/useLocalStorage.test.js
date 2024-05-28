import { renderHook, act } from './harness/index.js';

import useLocalStorage from '../useLocalStorage.js';

const KEY = 'myKey';
const DEFAULT_VALUE = 'DEFAULT_VALUE';

describe('useLocalStorage', () => {
  it('should set a default state if none exists', async () => {
    expect(window.localStorage.entries()).toEqual([]);

    const { result } = renderHook(() => useLocalStorage(KEY, DEFAULT_VALUE));

    expect(result.current[0]).toEqual(DEFAULT_VALUE);

    expect(window.localStorage.entries()).toEqual([
      [ KEY, `"${DEFAULT_VALUE}"` ],
    ]);
  });

  it('should pull an existing state', async () => {
    window.localStorage.reset([
      [ KEY, '"georgia"' ],
    ]);

    const { result } = renderHook(() => useLocalStorage(KEY));

    expect(result.current[0]).toEqual('georgia');
    expect(window.localStorage.entries()).toEqual([ [ KEY, '"georgia"' ] ]);
  });

  it('should update state', async () => {
    expect(window.localStorage.entries()).toEqual([]);

    const { rerender, result } = renderHook(
      () => useLocalStorage(KEY)
    );

    let state = result.current[0];
    const setState = result.current[1];
    const getState = result.current[2];

    expect(state).toBeUndefined();
    expect(getState()).toBeUndefined();
    expect(window.localStorage.entries()).toEqual([]);

    act(() => { setState('Bob'); });

    [ state ] = result.current;
    expect(state).toBe('Bob');

    rerender();

    [ state ] = result.current;
    expect(result.current).toEqual([
      'Bob',
      setState,
      getState,
    ]);

    expect(window.localStorage.entries()).toEqual([
      [ KEY, '"Bob"' ],
    ]);
  });

  it('should delete from storage if state is null', async () => {
    expect(window.localStorage.entries()).toEqual([]);

    const { result } = renderHook(
      () => useLocalStorage(KEY, DEFAULT_VALUE)
    );

    expect(window.localStorage.entries()).toEqual([
      [ KEY, `"${DEFAULT_VALUE}"` ],
    ]);

    let state = result.current[0];
    const setState = result.current[1];
    const getState = result.current[2];

    act(() => { setState(); });

    [ state ] = result.current;
    expect(state).toBeUndefined();
    expect(getState()).toBeUndefined();

    expect(window.localStorage.entries()).toEqual([]);
  });

  it('should serialize by default', async () => {
    expect(window.localStorage.entries()).toEqual([]);

    const { result } = renderHook(() => useLocalStorage(KEY, {
      [DEFAULT_VALUE]: DEFAULT_VALUE,
    }));

    expect(result.current[0]).toMatchObject({
      [DEFAULT_VALUE]: DEFAULT_VALUE,
    });

    expect(window.localStorage.entries()).toEqual([
      [ KEY, '{"DEFAULT_VALUE":"DEFAULT_VALUE"}' ],
    ]);
  });

  describe('isJSON = false', () => {
    it('should NOT serialize by default', async () => {
      expect(window.localStorage.entries()).toEqual([]);

      const { result } = renderHook(() => useLocalStorage(KEY, DEFAULT_VALUE, {
        isJSON: false,
      }));

      expect(result.current[0]).toEqual(DEFAULT_VALUE);

      expect(window.localStorage.entries()).toEqual([
        [ KEY, DEFAULT_VALUE ],
      ]);
    });

    it('should NOT serialize set values', async () => {
      expect(window.localStorage.entries()).toEqual([]);

      const { result } = renderHook(() => useLocalStorage(KEY, null, {
        isJSON: false,
      }));

      let state = result.current[0];
      const setState = result.current[1];
      const getState = result.current[2];

      expect(state).toBeUndefined();
      expect(getState()).toBeUndefined();
      expect(window.localStorage.entries()).toEqual([]);

      act(() => { setState('Bob'); });

      [ state ] = result.current;
      expect(state).toBe('Bob');

      expect(window.localStorage.entries()).toEqual([
        [ KEY, 'Bob' ],
      ]);
    });

    it('should throw an error if user attempts to use non-string', async () => {
      console.silence(); // eslint-disable-line no-console
      const onError = jest.fn();
      renderHook(() => useLocalStorage(KEY, {}, {
        isJSON: false,
      }), {
        onError,
      });

      expect(onError).toHaveBeenCalledWith(expect.objectContaining({
        message: 'defaultValue cannot be anything other than string when using isJSON=false',
      }));
    });

    it('should throw an error if user attempts to set a non-string', async () => {
      const { result } = renderHook(() => useLocalStorage(KEY, null, {
        isJSON: false,
      }));

      const setState = result.current[1];

      expect(() => {
        setState({});
      }).toThrow('setValue cannot receive anything other than string or undefined when using isJSON=false');
    });
  });
});
