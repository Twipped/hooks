// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from '@jest/globals';

/**
 * Jest Expect extension to support Assymetric matching on Error objects
 *
 * @param {any} actual
 * @param {string|RegExp} [message]
 * @returns {{ actual?: Error, message: () => string, pass: boolean }}
 */
function toBeError (actual, message) {
  if (!(actual instanceof Error)) {
    return {
      message: () => `expected ${this.utils.printReceived(actual)}${this.isNot ? ' not ' : ' '}to be an instance of Error.`,
      pass: false,
    };
  }

  if (typeof message === 'undefined' || message === null) {
    return {
      message: () => `expected ${this.utils.printReceived(actual)}${this.isNot ? ' not ' : ' '}to be an instance of Error.`,
      pass: true,
    };
  }

  let expected = /** @type {RegExp} */(message);
  if (!(message instanceof RegExp)) {
    expected = new RegExp(message);
  }

  const pass = expected.test(actual.message);
  const diffString = this.utils.diff(String(message), actual.message, {
    expand: this.expand,
  });

  let reply;
  if (pass) {
    reply = () => (
      'Received Error instance with matching message\n'
      + `Expected: ${this.utils.printExpected(message)}\nReceived: ${this.utils.printReceived(actual.message)}`
    );
  } else {
    reply = () => (
      `Received Error instance does not match the expected message:\n${diffString}`
    );
  }

  return { actual, message: reply, pass };
}

expect.extend({
  toBeError,
  exception: toBeError,
});
