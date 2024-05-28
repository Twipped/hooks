/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback } from 'react';
import { render, screen } from './harness/index.js';
import { useStatedContext, StatedProvider } from '../StatedContext.js';

describe('StatedContext', () => {
  test('exposes an initial value and transmits state changes to onChange callback', async () => {
    const onChange = jest.fn();

    function RadioButton ({ value, children }) {
      const { contextState, setContextState } = useStatedContext();

      const handleChange = useCallback(() => {
        setContextState(value);
      }, []);

      const selected = contextState === value;

      return (
        <label data-testid="target-one">
          <input
            type="checkbox"
            value={value}
            checked={selected}
            onChange={handleChange}
          />
          {children}
        </label>
      );
    }

    function TestComponent () {
      return (
        <StatedProvider value={1} onChange={onChange}>
          <RadioButton value={1}>One</RadioButton>
          <RadioButton value={2}>Two</RadioButton>
          <RadioButton value={3}>Three</RadioButton>
        </StatedProvider>
      );
    }

    const { click } = render(<TestComponent />);

    expect(onChange).not.toHaveBeenCalled();

    expect(screen.getByRole('checkbox', { name: 'One' })).toBeChecked();

    await click(screen.getByRole('checkbox', { name: 'Three' }));

    expect(onChange).toHaveBeenCalledWith(3);
    expect(screen.getByRole('checkbox', { name: 'One' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Three' })).toBeChecked();
  });

  test('updates state when the input value changes.', async () => {
    const onChange = jest.fn();

    function RadioButton ({ value, children }) {
      const { contextState, setContextState } = useStatedContext();

      const handleChange = useCallback(() => {
        setContextState(value);
      }, []);

      const selected = contextState === value;

      return (
        <label data-testid="target-one">
          <input
            type="checkbox"
            value={value}
            checked={selected}
            onChange={handleChange}
          />
          {children}
        </label>
      );
    }

    function TestComponent ({ value }) {
      return (
        <StatedProvider value={value} onChange={onChange}>
          <RadioButton value={1}>One</RadioButton>
          <RadioButton value={2}>Two</RadioButton>
          <RadioButton value={3}>Three</RadioButton>
        </StatedProvider>
      );
    }

    expect(onChange).not.toHaveBeenCalled();

    const { rerender } = render(<TestComponent value={2} />);

    expect(screen.getByRole('checkbox', { name: 'One' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Two' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Three' })).not.toBeChecked();

    rerender(<TestComponent value={3} />);

    expect(screen.getByRole('checkbox', { name: 'One' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Two' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Three' })).toBeChecked();

    expect(onChange).not.toHaveBeenCalled();
  });
});
