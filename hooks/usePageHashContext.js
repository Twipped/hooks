import PropTypes from 'prop-types';
import qs from 'qs';
import { createContext, useContext, useCallback, useMemo } from 'react';
import useEventHandler from './useEventHandler';
import useGettableState from './useGettableState';

export const PageHashContext = createContext(null);
PageHashContext.displayName = 'PageHashContext';

export default function usePageHashContext () {
  return useContext(PageHashContext) || {};
}

const propTypes = {
  arrayFormat: PropTypes.oneOf([ 'bracket', 'index', 'comma', 'separator', 'none' ]),
  arrayFormatSeparator: PropTypes.string,
  sort: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),
  parseNumbers: PropTypes.bool,
  parseBooleans: PropTypes.bool,
  skipNull: PropTypes.bool,
  skipEmptyString: PropTypes.bool,
};

const defaultProps = {
  arrayFormat: 'comma',
  parseNumbers: true,
  parseBooleans: true,
  skipNull: true,
  skipEmptyString: true,
};

export const PageHashContextProvider = ({
  children,
  ...qsOptions
}) => {
  // we already have a PageHashContext in the parent tree.
  if (useContext(PageHashContext)) return children;
  const browser = typeof window !== 'undefined';

  function stringify (input) {
    return qs.stringify(input, qsOptions).replace(/%2F/g, '/').replace(/%3A/g, ':');
  }


  const [ hashState, setHashState, getHashState ] = useGettableState({
    rawHash: browser ? window.location.hash.slice(1) : '',
    hash: browser ? qs.parse(window.location.hash.slice(1), qsOptions) : {},
    prevHash: null,
  });

  const push = useCallback((value, replace = false) => {
    const { hash: prevHash } = getHashState();
    const hash = { ...prevHash, ...value };
    const rawHash = stringify(value);

    if (browser) {
      const url = new URL(window.location);
      url.hash = rawHash;
      if (replace) {
        window.history.replaceState({}, '', url);
      } else {
        window.history.pushState({}, '', url);
      }
    }

    setHashState({
      rawHash,
      hash,
      prevHash,
    });
  }, [ setHashState, getHashState ]);

  const compute = useCallback((value) => {
    const hash = { ...getHashState().hash, ...value };
    return '#' + stringify(hash);
  }, [ getHashState ]);

  if (browser) {
    useEventHandler('hashchange', () => {
      setHashState({
        rawHash: window.location.hash.slice(1),
        hash: qs.parse(window.location.hash.slice(1), qsOptions),
        prevHash: hashState.hash,
      });
    }).attach(window);
  }

  const context = useMemo(() => ({ ...hashState, push, compute }), [ hashState.rawHash, push, compute ]);

  return (
    <PageHashContext.Provider value={context}>
      {children}
    </PageHashContext.Provider>
  );
};
PageHashContextProvider.propTypes = propTypes;
PageHashContextProvider.defaultProps = defaultProps;
