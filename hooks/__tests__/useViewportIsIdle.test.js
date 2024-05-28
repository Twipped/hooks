import { render, screen } from './harness/index.js';
import useViewportIsIdle from '../useViewportIsIdle.js';

describe('useViewportIsIdle', () => {
  test('marks idle after user inactivity and active on mouse action', async () => {
    jest.useFakeTimers();
    const flag = jest.fn();
    let idle;
    function Component () {
      idle = useViewportIsIdle(2, flag);
      return idle ? <span data-testid="idle" /> : <span data-testid="active" />;
    }

    const { pointer } = render(<Component />, {
      userEventOptions: {
        advanceTimers: jest.advanceTimersByTime,
      },
    });
    const now = Date.now();

    expect(screen.getByTestId('active')).toBeInTheDocument();
    expect(screen.queryByTestId('idle')).not.toBeInTheDocument();
    expect(flag).not.toHaveBeenCalled();

    await jest.advanceTimersByTimeAsync(10000);

    expect(flag).toHaveBeenCalledWith(expect.any(Date));
    expect(flag).toHaveBeenCalledTimes(1);
    expect(Date.now() - now).toEqual(10000);
    expect(screen.getByTestId('idle')).toBeInTheDocument();

    await pointer({ keys: '[MouseLeft]' });

    expect(screen.getByTestId('active')).toBeInTheDocument();
    expect(flag).toHaveBeenCalledWith(false);
    expect(flag).toHaveBeenCalledTimes(2);
  });
});
