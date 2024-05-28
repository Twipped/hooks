/* eslint-disable react/jsx-props-no-spreading, no-param-reassign, no-plusplus */
import {
  Children, isValidElement, Fragment,
} from 'react';
import iteratee from '@twipped/utils/iteratee';
import { isObject, isPrimitive } from '@twipped/utils/types';

/** @typedef {Parameters<typeof Children.toArray>[0]} Children */
/** @typedef {ReturnType<typeof Children.toArray>} ChildArray */
/** @typedef {ChildArray[0]} Child */
/** @typedef {import('react').ReactElement} ReactElement */

/**
 * Returns true if the given value is a class
 * @param {any} obj
 * @returns {boolean}
 */
export function isClass (obj) {
  if (!obj) return false;
  const isCtorClass = obj.constructor
    && obj.constructor.toString().substring(0, 5) === 'class';
  if (obj.prototype === undefined) {
    return isCtorClass;
  }
  const isPrototypeCtorClass = obj.prototype.constructor
    && obj.prototype.constructor.toString
    && obj.prototype.constructor.toString().substring(0, 5) === 'class';
  return isCtorClass || isPrototypeCtorClass;
}

/**
 * Returns true if the given value is a react class component
 * @param {any} component
 * @returns {boolean}
 */
export function isClassComponent (component) {
  if (!isClass(component)) return false;
  return !!(
    typeof component === 'function' && component.prototype && component.prototype.isReactComponent
  );
}

/**
 * Returns true if the given value is a function with 0 or 1 arguments
 * (and thus, conceivably a functional component)
 * @param {any} component
 * @returns {boolean}
 */
export function isFunctionComponent (component) {
  return !!(
    typeof component === 'function'
    && component.length <= 1
    && !isClass(component)
    && !component.prototype?.isReactComponent
  );
}

/**
 * Returns true if the given value is conceivably a react component (class or functional)
 * This is not foolproof, but will work for 99.9% of components
 * @param {any} component
 * @returns {boolean}
 */
export function isComponent (component) {
  return !!(
    isClassComponent(component)
    || isFunctionComponent(component)
  );
}

/**
 * Returns true if the given value is a react element object.
 * @param {any} element
 * @returns {boolean}
 */
export function isElement (element) {
  return isValidElement(element);
}

/**
 * Returns true if the given child is a fragment element
 * @param {any} element
 * @returns {boolean}
 */
export function isFragment (element) {
  if (!isValidElement(element)) return false;
  return element?.type === Fragment;
}

/**
 * Generator function which iterates over a react component's children, descending into fragments
 * By default this will exclude text nodes and non-component values
 * @param {Children} children
 * @param {boolean} [all] Pass true to yield all child elements, not just valid components
 * @yields {Child}
 */
export function* childIterator (children, all) {
  for (const child of Children.toArray(children)) {
    if (isFragment(child)) {
      const fragment = /** @type {ReactElement} */ (child);
      yield* childIterator(fragment.props.children, all);
      continue;
    }
    if (!all && (!isValidElement(child) || typeof child !== 'object')) {
      continue;
    }
    yield child;
  }
}

/**
 * Predicate function for childDescender's shouldDescend option.
 * Is invoked on each child. Return 0 or false to ignore the child,
 * 1 or true to descend into the child, or -1 to process the child but
 * ignore its children.
 * @callback shouldDescendPredicate
 * @param {Child} child The child element being iterated
 * @param {boolean} validElement Indicates if the child is a valid react element
 * @returns {undefined|-1|0|1|boolean}
 */

/**
 * Generator function which iterates recursively through a react component's children.
 * By default this will exclude text nodes and non-component values
 * @param {Children} children
 * @param {boolean|shouldDescendPredicate} [shouldDescend] Pass true to yield all child elements,
 * not just valid components. Pass a function to evaluate each child element individually.
 * @yields {Child}
 */
export function* childDescender (children, shouldDescend = false) {
  for (const child of Children.toArray(children)) {
    const validElement = isValidElement(child);
    const scan = (
      (shouldDescend === true && 1)
      || (shouldDescend === false && validElement && 1)
      || Number(typeof shouldDescend === 'function' && (shouldDescend(child, validElement) || 0))
    );
    if (!scan) continue;

    yield child;
    // @ts-ignore
    if (scan > 0 && child.props?.children) {
      // @ts-ignore
      yield* childDescender(child.props.children, shouldDescend);
    }
  }
}

/**
 * @typedef FlattenedChild
 * @property {string} key
 * @property {import('react').Ref<HTMLElement>} ref
 * @property {import('react').JSXElementConstructor<any>} type
 * @property {{[key: string]: any}} props
 */

export const Primitive = Symbol('react.element.text');

/**
 * Flattens a component tree into a single array of descriptive objects, suitable
 * for use in memoization.
 *
 * @param {Children} children The react `children` property
 * @param {boolean|shouldDescendPredicate} [shouldDescend] Pass true to yield all child elements,
 * not just valid components. Pass a function to evaluate each child element individually.
 * @returns {Array<FlattenedChild>}
 */
export function flattenChildren (children, shouldDescend = true) {
  return Array.from(
    childDescender(children, shouldDescend),
    ((child, index) => {
      if (isPrimitive(child)) {
        return {
          key: `$${index}`,
          ref: null,
          type: Primitive,
          props: { children: child },
        };
      }
      const {
        key = `$${index}`,
        ref,
        type,
        props: {
          // @ts-ignore
          children: $, // eslint-disable-line no-unused-vars
          ...props
        } = {},
      } = child;
      return {
        key, ref, type, props,
      };
    })
  ).flat(1).filter(({ type }) => type);
}
flattenChildren.Primitive = Primitive;

const NATURAL_KEY = /^\.\d+$/;

/**
 * Iterates through children that are typically specified as `props.children`,
 * returning only the children where the predicate results in a truthy return.
 * By default this will ignore text nodes and non-component values
 * @param {Children} children
 * @param {(child: Child, index: number, children: Children) => boolean} predicate
 * @param {boolean} [all] Pass true to filter over all child elements, not just valid components
 * @returns {ChildArray}
 */
export function filterChildren (children, predicate, all = false) {
  predicate = /** @type {(child: Child, index: number, children: Children) => boolean} */ (iteratee(predicate));
  let index = 0;
  const result = [];
  for (const child of childIterator(children, all)) {
    const res = predicate(child, index++, children);
    if (res) result.push(child);
  }

  return result;
}

/**
 * Clones the children of a react component in a map fashion, applying new properties to each.
 * @param {Children} children
 * @param {object | ((child: Child, index: number, children: Children) => Child)} predicate
 * @returns {ChildArray}
 */
export function cloneChildren (children, predicate) {
  if (isObject(predicate)) {
    const props = predicate;
    predicate = (p) => ({ ...p, ...props });
  }

  let i = 0;
  const results = [];

  for (const child of childIterator(children)) {
    if (!isValidElement(child)) continue;

    let res = predicate(child.props, child, i++);

    if (!res) continue;
    if (res && !isValidElement(res) && !isObject(res, true)) {
      throw new TypeError(`cloneChildren received a value it does not know how to process: ${res}`);
    }

    if (isValidElement(res) && typeof res === 'object') {
      // @ts-ignore
      const key = NATURAL_KEY.exec(res.key) ? `.${i - 1}` : res.key;
      // @ts-ignore
      res = <res.type ref={res.ref} key={key} {...res.props} />;
    } else if (isObject(res, true)) {
      // @ts-ignore
      const key = NATURAL_KEY.exec(child.key) ? `.${i - 1}` : child.key;
      // @ts-ignore
      res = <child.type ref={child.ref} key={key} {...res} />;
    }

    results.push(res);
  }

  return results;
}
