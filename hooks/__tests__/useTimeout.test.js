import wait from 'waait';
import { StrictMode, useEffect } from 'react';
import {
  render, waitFor,
} from './harness/index.js';
import useTimeout from '../useTimeout.js';

describe('useTimeout', () => {
  describe('without strictmode', () => {
    test('fires after a set amount of time', async () => {
      const flag = jest.fn();
      function Component () {
        const timer = useTimeout();
        useEffect(() => {
          timer.set(flag, 500);
        });
        return null;
      }

      render(<Component />);
      expect(flag).not.toHaveBeenCalled();
      await waitFor(() => {
        expect(flag).toHaveBeenCalled();
      });
    });

    test('unsets on unmount', async () => {
      const flag = jest.fn();
      function Component () {
        const timer = useTimeout();
        useEffect(() => {
          timer.set(flag, 500);
        });
        return null;
      }

      const { unmount } = render(<Component />);
      expect(flag).not.toHaveBeenCalled();
      unmount();

      await wait(1000);
      expect(flag).not.toHaveBeenCalled();
    });

    test('with rootFn', async () => {
      const flag = jest.fn();
      function Component () {
        const timer = useTimeout(() => flag(new Date()));
        useEffect(() => {
          timer.set(500);
        });
        return null;
      }

      render(<Component />);
      expect(flag).not.toHaveBeenCalled();
      await waitFor(() => {
        expect(flag).toHaveBeenCalled();
      });
    });
  });

  describe('with strictmode', () => {
    test('fires after a set amount of time', async () => {
      const flag = jest.fn();
      function Component () {
        const timer = useTimeout();
        useEffect(() => {
          timer.set(flag, 500);
        });
        return null;
      }

      render(<StrictMode><Component /></StrictMode>);
      expect(flag).not.toHaveBeenCalled();
      await waitFor(() => {
        expect(flag).toHaveBeenCalled();
      });
    });

    test('unsets on unmount', async () => {
      const flag = jest.fn();
      function Component () {
        const timer = useTimeout();
        useEffect(() => {
          timer.set(flag, 500);
        });
        return null;
      }

      const { unmount } = render(<StrictMode><Component /></StrictMode>);
      expect(flag).not.toHaveBeenCalled();
      unmount();

      await wait(1000);
      expect(flag).not.toHaveBeenCalled();
    });

    test('with rootFn', async () => {
      const flag = jest.fn();
      function Component () {
        const timer = useTimeout(() => flag(new Date()));
        useEffect(() => {
          timer.set(500);
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
});
