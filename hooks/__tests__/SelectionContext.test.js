/* eslint-disable jsx-a11y/label-has-associated-control */
import userEvent from '@testing-library/user-event';

import { useCallback } from 'react';
import { render, screen } from './harness/index.js';
import { useSelectionContext, SelectionProvider } from '../SelectionContext.js';

describe('SelectionContext', () => {
  test('exposes an initial value and transmits state changes to onChange callback', async () => {
    const onChange = jest.fn();

    function CheckBox ({ value, children }) {
      const { hasSelection, toggleSelection } = useSelectionContext();

      const handleChange = useCallback((ev) => {
        toggleSelection(value, ev.target.checked);
      }, []);

      const selected = hasSelection(value);

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
        <SelectionProvider value={[ 1 ]} onChange={onChange}>
          <CheckBox value={1}>One</CheckBox>
          <CheckBox value={2}>Two</CheckBox>
          <CheckBox value={3}>Three</CheckBox>
        </SelectionProvider>
      );
    }

    const { click } = render(<TestComponent />);

    expect(onChange).not.toHaveBeenCalled();

    expect(screen.getByRole('checkbox', { name: 'One' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Two' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Three' })).not.toBeChecked();

    await click(screen.getByRole('checkbox', { name: 'Three' }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([ 1, 3 ]);
    expect(screen.getByRole('checkbox', { name: 'One' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Two' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Three' })).toBeChecked();
  });

  test('handles a non-array initial value', async () => {
    const onChange = jest.fn();

    function CheckBox ({ value, children }) {
      const { hasSelection, toggleSelection } = useSelectionContext();

      const handleChange = useCallback((ev) => {
        toggleSelection(value, ev.target.checked);
      }, []);

      const selected = hasSelection(value);

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
        <SelectionProvider value={2} onChange={onChange}>
          <CheckBox value={1}>One</CheckBox>
          <CheckBox value={2}>Two</CheckBox>
          <CheckBox value={3}>Three</CheckBox>
        </SelectionProvider>
      );
    }

    render(<TestComponent />);

    expect(onChange).not.toHaveBeenCalled();

    expect(screen.getByRole('checkbox', { name: 'One' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Two' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Three' })).not.toBeChecked();
  });

  test('setSelection overwrites all state', async () => {
    const onChange = jest.fn();

    function CheckBox ({ value, children }) {
      const { hasSelection, setSelection } = useSelectionContext();

      const handleChange = useCallback(() => {
        setSelection(value);
      }, []);

      const selected = hasSelection(value);

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
        <SelectionProvider value={[ 1 ]} onChange={onChange}>
          <CheckBox value={1}>One</CheckBox>
          <CheckBox value={2}>Two</CheckBox>
          <CheckBox value={3}>Three</CheckBox>
        </SelectionProvider>
      );
    }

    const { click } = userEvent.setup();
    render(<TestComponent />);

    expect(onChange).not.toHaveBeenCalled();

    expect(screen.getByRole('checkbox', { name: 'One' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Two' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Three' })).not.toBeChecked();

    await click(screen.getByRole('checkbox', { name: 'Three' }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([ 3 ]);
    expect(screen.getByRole('checkbox', { name: 'One' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Two' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Three' })).toBeChecked();
  });

  test('clearSelection clears the selection', async () => {
    const onChange = jest.fn();

    function CheckBox ({ value, children }) {
      const { hasSelection, setSelection } = useSelectionContext();

      const handleChange = useCallback(() => {
        setSelection(value);
      }, []);

      const selected = hasSelection(value);

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
        <SelectionProvider value={[ 1, 2, 3 ]} onChange={onChange}>
          {({ clearSelection }) => (
            <>
              <CheckBox value={1}>One</CheckBox>
              <CheckBox value={2}>Two</CheckBox>
              <CheckBox value={3}>Three</CheckBox>
              <button onClick={() => clearSelection()}>clear</button>
            </>
          )}
        </SelectionProvider>
      );
    }

    const { click } = render(<TestComponent />);

    expect(onChange).not.toHaveBeenCalled();

    expect(screen.getByRole('checkbox', { name: 'One' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Two' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Three' })).toBeChecked();

    await click(screen.getByRole('button', { name: 'clear' }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([]);
    expect(screen.getByRole('checkbox', { name: 'One' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Two' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Three' })).not.toBeChecked();
  });

  test('updates state when the input value changes.', async () => {
    const onChange = jest.fn();

    function CheckBox ({ value, children }) {
      const { hasSelection, setSelection } = useSelectionContext();

      const handleChange = useCallback(() => {
        setSelection(value);
      }, []);

      const selected = hasSelection(value);

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
        <SelectionProvider value={value} onChange={onChange}>
          <CheckBox value={1}>One</CheckBox>
          <CheckBox value={2}>Two</CheckBox>
          <CheckBox value={3}>Three</CheckBox>
        </SelectionProvider>
      );
    }

    expect(onChange).not.toHaveBeenCalled();

    const { rerender } = render(<TestComponent value={[ 2 ]} />);

    expect(screen.getByRole('checkbox', { name: 'One' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Two' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Three' })).not.toBeChecked();

    rerender(<TestComponent value={[ 2 ]} />);

    expect(screen.getByRole('checkbox', { name: 'One' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Two' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Three' })).not.toBeChecked();

    rerender(<TestComponent value={[ 1, 2 ]} />);

    expect(screen.getByRole('checkbox', { name: 'One' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Two' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Three' })).not.toBeChecked();

    expect(onChange).not.toHaveBeenCalled();
  });
});
