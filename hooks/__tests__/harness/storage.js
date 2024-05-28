/* eslint-disable jest/require-hook, jest/require-top-level-describe */

export default class WebStorage {
  #store = new Map();

  getItem (key) {
    return this.#store.get(key);
  }

  setItem (key, value) {
    this.#store.set(key, String(value));
  }

  removeItem (key) {
    this.#store.delete(key);
  }

  clear () {
    this.#store.clear();
  }

  key (n) {
    return this.#store.get(
      Array.from(this.#store.keys())[n]
    );
  }

  get length () {
    return this.#store.size;
  }

  reset (entries) {
    if (typeof entries === 'object' && !Array.isArray(entries)) {
      // eslint-disable-next-line no-param-reassign
      entries = Object.entries(entries);
    }
    this.#store = new Map(entries);
  }

  entries () {
    return Array.from(this.#store.entries());
  }

  static setup () {
    Object.defineProperty(window, 'localStorage', {
      value: new WebStorage(),
    });

    Object.defineProperty(window, 'sessionStorage', {
      value: new WebStorage(),
    });

    beforeEach(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
  }
}
