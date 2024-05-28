import { Suspense } from 'react';

import {
  screen, render, act,
} from './harness/index.js';

import useSuspense from '../useSuspense.js';

describe('suspend()', () => {
  test('suspends in progress tasks', async () => {
    let finish;
    const onError = jest.fn();

    function Component () {
      const result = useSuspense('wait-to-finish', () => new Promise((resolve) => {
        finish = resolve;
      }));

      return <div data-testid="finished">{result}</div>;
    }

    function Fallback () {
      return <div data-testid="fallback" />;
    }

    render(
      <Suspense fallback={<Fallback />}>
        <Component />
      </Suspense>,
      onError
    );

    expect(screen.getByTestId('fallback')).toBeInTheDocument();

    act(() => finish('FINISHED'));

    // wait for suspension to end
    expect(await screen.findByTestId('finished')).toBeInTheDocument();
    expect(screen.queryByTestId('fallback')).not.toBeInTheDocument();

    expect(onError).not.toHaveBeenCalled();
  });

  test('throws errors', async () => {
    let fail;
    const onError = jest.fn();

    function Component () {
      const result = useSuspense('wait-to-fail', () => new Promise((resolve, reject) => {
        fail = reject;
      }));

      return <div data-testid="finished">{result}</div>;
    }

    function Fallback () {
      return <div data-testid="fallback" />;
    }

    render(
      <Suspense fallback={<Fallback />}>
        <Component />
      </Suspense>,
      { onError }
    );

    expect(screen.getByTestId('fallback')).toBeInTheDocument();

    act(() => fail(new Error('FAILED')));

    // wait for suspension to end
    expect(await screen.findByTestId('error')).toBeInTheDocument();

    // @ts-ignore
    expect(onError).toHaveBeenCalledWith(expect.exception('FAILED'));
  });

  test('retains state until reset', async () => {
    let counter = 0;
    const onError = jest.fn();

    function Component () {
      // eslint-disable-next-line no-return-assign
      const result = useSuspense('incrementer', async () => {
        counter += 1;
        return counter;
      });
      return <div data-testid="counter">{result}</div>;
    }

    function Fallback () {
      return <div data-testid="fallback" />;
    }

    const App = () => (
      <Suspense fallback={<Fallback />}>
        <Component />
      </Suspense>
    );

    const { rerender } = render(<App key="a" />, onError);

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(await screen.findByTestId('counter')).toHaveTextContent('1');

    rerender(<App key="b" />); // invoke with a new key to force re-mount

    expect(screen.queryByTestId('fallback')).not.toBeInTheDocument();
    expect(await screen.findByTestId('counter')).toHaveTextContent('1');

    useSuspense.reset('incrementer');

    rerender(<App key="c" />); // invoke with a new key to force re-mount

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(await screen.findByTestId('counter')).toHaveTextContent('2');

    useSuspense.resetAll();

    rerender(<App key="d" />); // invoke with a new key to force re-mount

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(await screen.findByTestId('counter')).toHaveTextContent('3');

    expect(onError).not.toHaveBeenCalled();
  });
});
