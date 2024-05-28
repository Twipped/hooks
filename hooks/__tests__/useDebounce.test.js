import { StrictMode, useEffect } from 'react';
import { render, waitFor } from './harness/index.js';
import useDebounce from '../useDebounce.js';

describe('useDebounce', () => {
  test('fires after a set amount of time', async () => {
    const flag = jest.fn();
    function Component () {
      const fire = useDebounce(flag, 100);
      useEffect(() => {
        fire();
      });
      return null;
    }

    render(<Component />);
    expect(flag).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(flag).toHaveBeenCalled();
    });
  });

  test('works in strict mode', async () => {
    const flag = jest.fn();
    function Component () {
      const fire = useDebounce(flag, 100);
      useEffect(() => {
        fire();
      });
      return null;
    }

    render(<StrictMode><Component /></StrictMode>);
    expect(flag).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(flag).toHaveBeenCalled();
    });
  });
});
