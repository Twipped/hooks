import { createRef, forwardRef, useState } from 'react';
import { render } from '@testing-library/react';
import useMergedRefs from '../hooks/useMergedRefs.js';

describe('useMergedRefs', () => {
  it('should return a function that returns mount state', () => {
    let innerRef;
    const outerRef = createRef();

    const Button = forwardRef((props, ref) => {
      const [ buttonEl, attachRef ] = useState();
      innerRef = buttonEl;

      const mergedRef = useMergedRefs(ref, attachRef);

      return <button ref={mergedRef} {...props} />;
    });

    function Wrapper () {
      return <Button ref={outerRef} />;
    }
    render(<Wrapper />);

    expect(innerRef?.tagName).toEqual('BUTTON');
    expect(outerRef.current?.tagName).toEqual('BUTTON');
  });
});
