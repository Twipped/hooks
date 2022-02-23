import { useMemo } from 'react';
import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';

/**
 * Takes a style definition and passes it through the Emotion css engine.
 *
 * @function useEmotion
 * @param  {string | object | Function} stylesElement Style definition
 * @returns {object} Collection of scoped css classes, keyed to their original names
 */
export default function useEmotion (stylesElement) {
  const theme = useTheme();
  return useMemo(() => {
    const rawClasses = typeof stylesElement === 'function'
      ? stylesElement(theme)
      : stylesElement;
    const prepared = {};

    Object.entries(rawClasses).forEach(([ key, value = {} ]) => {
      prepared[key] = css(value);
    });

    return prepared;
  }, [ stylesElement, theme ]);
}
