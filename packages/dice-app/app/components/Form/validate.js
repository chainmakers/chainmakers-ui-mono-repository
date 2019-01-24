/* eslint-disable no-await-in-loop */
// @flow
import React, { type Node } from 'react';

const debug = require('debug')('atomicapp:components:Form:validate');

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  onChange: Function | undefiend
};

type State = {
  error: string,
  value: string
};

export default function validate(
  WrappedComponent: Node,
  // eslint-disable-next-line flowtype/no-weak-types
  validations: Array<Function>,
  // eslint-disable-next-line flowtype/no-weak-types
  options: Object = {
    onChange: false
  }
) {
  return class extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);

      debug('constructor');

      this.state = {
        error: '',
        value: props.value || ''
      };
    }

    handleChange = (evt: SyntheticInputEvent<>) => {
      evt.preventDefault();
      const { value } = evt.target;
      if (options.onChange) {
        this.setState(
          {
            value
          },
          this.setErrors
        );
      } else {
        this.setState({
          value
        });
      }
    };

    reset = () => {
      this.setState({
        error: '',
        value: ''
      });
    };

    setErrors = async () => {
      const { onChange } = this.props;
      const { value } = this.state;
      try {
        // eslint-disable-next-line no-restricted-syntax, no-await-in-loop
        for (const validation of validations) {
          await validation(value, this.props);
        }
        this.setState({
          error: ''
        });
      } catch (err) {
        this.setState({
          error: err.message
        });
      } finally {
        if (onChange) {
          onChange(value);
        }
      }
    };

    setValue = async value => {
      try {
        // eslint-disable-next-line no-restricted-syntax,
        for (const validation of validations) {
          await validation(value, this.props);
        }
        this.setState({
          error: '',
          value
        });
        return true;
      } catch (err) {
        this.setState({
          error: err.message
        });
        // continue throw error
        throw err;
      }
    };

    value = async () => {
      const { value } = this.state;
      try {
        // eslint-disable-next-line no-restricted-syntax,
        for (const validation of validations) {
          await validation(value, this.props);
        }
        this.setState({
          error: ''
        });
        return value;
      } catch (err) {
        this.setState({
          error: err.message
        });
        // continue throw error
        throw err;
      }
    };

    rawvalue = () => {
      const { value } = this.state;
      return value;
    };

    render() {
      debug(`render`);

      const { value, error } = this.state;

      return (
        <WrappedComponent
          {...this.props}
          onChange={this.handleChange}
          value={value}
          error={error}
          isError={error !== ''}
        />
      );
    }
  };
}
/* eslint-enable no-await-in-loop */
