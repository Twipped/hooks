/* eslint-disable max-classes-per-file */
/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import {
  isClass,
  isClassComponent,
  isFunctionComponent,
  isComponent,
  isElement,
  isFragment,
  childIterator,
  childDescender,
  flattenChildren,
  filterChildren,
  cloneChildren,
} from '../children.js';

// eslint-disable-next-line no-unused-vars
function GenericFunction (foo) {}
// eslint-disable-next-line no-unused-vars
function GenericFunctionWithManyArguments (foo, bar) { }

const ShortFunction = () => {};

function FunctionalComponent () {
  return <div />;
}

class ClassicalComponent extends Component {
  render () {
    return <div />;
  }
}

class GenericClass {

}

describe('is* functions', () => {
  const targets = {
    'a function': GenericFunction,
    'a function with arguments': GenericFunctionWithManyArguments,
    'a short function': ShortFunction,
    'a functional component': FunctionalComponent,
    'a class': GenericClass,
    'a class component': ClassicalComponent,
    'an element': <FunctionalComponent />,
    'an html element': <div />,
    // eslint-disable-next-line react/jsx-no-useless-fragment
    'a fragment': <></>,
    'a null': null,
    'a string': 'string',
    'a number': 1,
    // eslint-disable-next-line quote-props
    'undefined': undefined,
  };
  const functions = {
    isClass,
    isClassComponent,
    isFunctionComponent,
    isComponent,
    isElement,
    isFragment,
  };

  const tests = [];
  for (const [ fName, f ] of Object.entries(functions)) {
    for (const [ tName, t ] of Object.entries(targets)) {
      tests.push([ `${fName} tested against ${tName}`, f, t ]);
    }
  }

  test.each(tests)('%s', (testName, fn, target) => {
    expect(fn(target)).toMatchSnapshot();
  });
});

describe('iterators', () => {
  const { children } = (
    <>
      <ClassicalComponent a="a" b={1} />
      {[ <ShortFunction key="short1" />, <ShortFunction key="short2" /> ]}
      <>
        <FunctionalComponent>
          {undefined}
          <div>
            {true}
            <strong>Foo</strong>
          </div>
        </FunctionalComponent>
        {null}
        <FunctionalComponent />
      </>
      Bar
      {[ function Baz () {} ]}
      <ClassicalComponent c="c" d={2} />
    </>
  ).props;

  test('childIterator', async () => {
    const actual = Array.from(childIterator(children));
    expect(actual).toMatchSnapshot();
  });

  describe('childDescender', () => {
    test('all nodes', async () => {
      const actual = Array.from(childDescender(children));
      expect(actual).toMatchSnapshot();
    });
    test('with predicate', async () => {
      const actual = flattenChildren(children, (child, validElement) => {
        if (!validElement) return false;
        if (typeof child.type === 'string') return -1; // skip the div tag's content
        return 1;
      });
      expect(actual).toMatchSnapshot();
    });
  });

  test('childIterator - all', async () => {
    const actual = Array.from(childIterator(children, true));
    expect(actual).toMatchSnapshot();
  });

  test('childDescender - all', async () => {
    const actual = Array.from(childDescender(children, true));
    expect(actual).toMatchSnapshot();
  });

  describe('flattenChildren', () => {
    test('flatten all', async () => {
      const actual = flattenChildren(children);
      expect(actual).toMatchSnapshot();
    });

    test('flatten with predicate', async () => {
      const actual = flattenChildren(children, (child, validElement) => {
        if (!validElement) return false;
        if (typeof child.type === 'string') return -1; // skip the div tag's content
        return 1;
      });
      expect(actual).toMatchSnapshot();
    });
  });

  test('filterChildren', async () => {
    const actual = filterChildren(children, ({ type }) => type !== FunctionalComponent);
    expect(actual).toMatchSnapshot();
  });

  test('filterChildren - all', async () => {
    const actual = filterChildren(children, ({ type }) => type !== FunctionalComponent, true);
    expect(actual).toMatchSnapshot();
  });

  describe('cloneChildren', () => {
    test('providing an object reproduces an entire element structure, shallowly adding props', () => {
      const actual = cloneChildren(children, { thing: 'thing' });
      expect(actual).toMatchSnapshot();
    });

    test('accepts a props object as a predicate return', () => {
      const actual = cloneChildren(children, (props, child, index) => ({
        value: index,
        children: props.children,
      }));
      expect(actual).toMatchSnapshot();
    });

    test('accepts a new element returned from the predicate', () => {
      const actual = cloneChildren(children, (props, child, index) => (
        <b {...props} value={index}>replaced!</b>
      ));
      expect(actual).toMatchSnapshot();
    });

    test('throws if receives reply it cannot handle', () => {
      expect(() => {
        cloneChildren(children, () => new Map());
      }).toThrow('cloneChildren received a value it does not know how to process: [object Map]');
    });
  });
});
