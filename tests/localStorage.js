/* eslint-disable jest/require-hook, jest/require-top-level-describe */

export class LocalStorage {
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

  entries () {
    return Array.from(this.#store.entries());
  }
}
