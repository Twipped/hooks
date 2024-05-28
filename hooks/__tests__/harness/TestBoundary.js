/* eslint-disable no-param-reassign, react/sort-comp, jsdoc/require-jsdoc, react/prop-types */

import { Component } from 'react';
import PropTypes from 'prop-types';
import Intercept from './intercept.js';

/**
 * This ErrorBoundary exists PURELY FOR USING IN TESTS
 * It should not ever be used in production code!!
 */

export function ErrorDisplay({ error }) {
  return (
    <div data-testid="error">
      {error.stack || error.message}
      {error.componentStack ? `\nComponents:\n${error.componentStack}` : null}
    </div>
  );
}

export default class TestBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  componentDidCatch(error, { componentStack }) {
    this.setState({ error });
    error.componentStack = componentStack;
    Intercept.report(error, 'render');
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (!error) return children;

    return <ErrorDisplay error={error} />;
  }
}

TestBoundary.propTypes = {
  children: PropTypes.node.isRequired
};
