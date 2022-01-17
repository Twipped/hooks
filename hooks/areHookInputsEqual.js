

export default function areHookInputsEqual (nextDeps, prevDeps) {
  const is = Object.is || ((x, y) => (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y)); // eslint-disable-line no-self-compare

  if (!prevDeps || !nextDeps || prevDeps.length !== nextDeps.length) {
    return false;
  }

  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (!is(nextDeps[i], prevDeps[i])) return false;
  }
  return true;
}
