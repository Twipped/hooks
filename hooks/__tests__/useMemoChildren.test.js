import { render, screen } from './harness/index.js';
import useMemoChildren from '../useMemoChildren.js';

function Empty () { return null; }

describe('useMemoChildren', () => {
  let counter;
  function Component ({ children }) {
    const output = useMemoChildren(() => {
      counter += 1;
      return counter;
    }, children);
    return <div data-testid="result">{output}</div>;
  }

  beforeEach(() => { counter = 0; });

  it('maintain the same return through re-renders', () => {
    const { rerender } = render(
      <Component>
        <Empty a="a">A</Empty>
      </Component>
    );

    expect(screen.getByTestId('result')).toHaveTextContent(1);

    rerender(
      <Component>
        <Empty a="a">A</Empty>
      </Component>
    );

    expect(screen.getByTestId('result')).toHaveTextContent(1);

    rerender(
      <Component>
        <Empty a="b">A</Empty>
      </Component>
    );

    expect(screen.getByTestId('result')).toHaveTextContent(2);
  });

  it('result changes if props change', () => {
    const { rerender } = render(
      <Component>
        <Empty a="a">A</Empty>
      </Component>
    );

    expect(screen.getByTestId('result')).toHaveTextContent(1);

    rerender(
      <Component>
        <Empty a="b">A</Empty>
      </Component>
    );

    expect(screen.getByTestId('result')).toHaveTextContent(2);
  });

  it('result changes if tree changes', () => {
    const { rerender } = render(
      <Component>
        <Empty a="a">A</Empty>
      </Component>
    );

    expect(screen.getByTestId('result')).toHaveTextContent(1);

    rerender(
      <Component>
        <Empty a="a">A</Empty>
        <Empty a="a">A</Empty>
      </Component>
    );

    expect(screen.getByTestId('result')).toHaveTextContent(2);
  });

  it('result changes even if only text changes', () => {
    const { rerender } = render(
      <Component>
        A
      </Component>
    );

    expect(screen.getByTestId('result')).toHaveTextContent(1);

    rerender(
      <Component>
        <Empty a="a" />
      </Component>
    );

    expect(screen.getByTestId('result')).toHaveTextContent(2);

    rerender(
      <Component>
        <Empty a="a">A</Empty>
      </Component>
    );

    expect(screen.getByTestId('result')).toHaveTextContent(3);

    rerender(
      <Component>
        <Empty a="a">B</Empty>
      </Component>
    );

    expect(screen.getByTestId('result')).toHaveTextContent(4);
  });

  it('result changes if child adds child', () => {
    const { rerender } = render(
      <Component>
        <Empty a="a" />
      </Component>
    );

    expect(screen.getByTestId('result')).toHaveTextContent(1);

    rerender(
      <Component>
        <Empty a="a"><b /></Empty>
      </Component>
    );

    expect(screen.getByTestId('result')).toHaveTextContent(2);
  });

  it('ignores functions', () => {
    const { rerender } = render(
      <Component>
        {() => 'A'}
        <Empty a="a" />
      </Component>
    );

    expect(screen.getByTestId('result')).toHaveTextContent(1);

    rerender(
      <Component>
        {() => 'B'}
        <Empty a="a" />
      </Component>
    );

    // no change, function had no impact
    expect(screen.getByTestId('result')).toHaveTextContent(1);

    rerender(
      <Component>
        {() => 'B'}
        <Empty a="b" />
      </Component>
    );

    // value changes due to prop change
    expect(screen.getByTestId('result')).toHaveTextContent(2);
  });
});
