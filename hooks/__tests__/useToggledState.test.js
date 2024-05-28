import { act, renderHook } from './harness/index.js';
import useToggledState from '../useToggledState.js';

describe('useToggledState', () => {
  it('handles state flips', () => {
    const { result, rerender } = renderHook(() => (
      useToggledState(true)
    ));

    expect(result.current.state).toBe(true);
    expect(result.current.get()).toBe(true);

    act(() => { result.current.off('ignored'); });

    expect(result.current.state).toBe(false);

    rerender();

    expect(result.current.state).toBe(false);
    expect(result.current.get()).toBe(false);

    act(() => { result.current.on(0); });

    expect(result.current.state).toBe(true);
    expect(result.current.get()).toBe(true);

    act(() => { result.current.toggle(); });

    expect(result.current.state).toBe(false);
    expect(result.current.get()).toBe(false);

    act(() => { result.current.toggle(false); });

    expect(result.current.state).toBe(false);
    expect(result.current.get()).toBe(false);

    act(() => { result.current.toggle(); });

    expect(result.current.state).toBe(true);
    expect(result.current.get()).toBe(true);

    act(() => { result.current.toggle(true); });

    expect(result.current.state).toBe(true);
    expect(result.current.get()).toBe(true);
  });
});
