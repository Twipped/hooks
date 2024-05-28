import { useEffect, useRef } from 'react';
import {
  render, screen,
} from './harness/index.js';
import useEventHandler, { useEventHandlerOn } from '../useEventHandler.js';

describe('useEventHandler', () => {
  describe.each([ false, true ])('strict mode: %s', (strictMode) => {
    it('creates a handler interface, handles events, and detaches on unmount', async () => {
      const spy = jest.fn();
      function Component () {
        const handler = useEventHandler('click', spy);

        useEffect(() => {
          handler.attach(document.body);
        });
      }

      const { click, unmount } = render(<Component />, { strictMode });

      expect(spy).not.toHaveBeenCalled();

      await click(document.body);

      expect(spy).toHaveBeenCalledTimes(1);

      unmount();

      await click(document.body);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

describe('useEventHandlerOn', () => {
  describe.each([ false, true ])('strict mode: %s', (strictMode) => {
    test('creates a handler interface, handles events, and detaches on unmount', async () => {
      const spy = jest.fn();
      function Component () {
        const elRef = useRef();
        useEventHandlerOn(elRef, 'click', spy);

        return <button ref={elRef}>Click</button>;
      }

      const { click } = render(<Component />, { strictMode });

      expect(spy).not.toHaveBeenCalled();

      await click(screen.getByRole('button'));

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
