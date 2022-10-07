import {
  Component,
  createElement,
  isValidElement,
  cloneElement,
} from 'react';

import PropTypes from 'prop-types';

export default class TestBoundary extends Component {
  constructor (props) {
    super(props);
    this.state = { error: false };
  }

  componentDidCatch (error, { componentStack }) {
    const { onError } = this.props;
    this.setState({ error, componentStack });
    if (onError) {
      onError(error);
    } else {
      process.emit('uncaughtException', error);
    }
  }

  render () {
    const { children, fallback } = this.props;
    const { error } = this.state;

    if (!error) return children;

    if (isValidElement(fallback)) {
      return cloneElement(fallback, this.state);
    }

    if (typeof fallback === 'function') {
      return createElement(fallback, this.state);
    }

    return fallback || null;
  }
}

TestBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  onError: PropTypes.func,
  fallback: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.elementType,
    PropTypes.func,
  ]),
};
