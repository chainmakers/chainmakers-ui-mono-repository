// @flow
import React from 'react';
import debounce from 'lodash/debounce';
import TextField from '@material-ui/core/TextField';

const debug = require('debug')(
  'atomicapp:containers:CoinsSelectionDialog:components:InputSearch'
);

// https://stackoverflow.com/questions/42361485/how-long-should-you-debounce-text-input
const LIMIT_TIME = 150;

type Props = {
  inputRoot: string,
  inputInput: string,
  // eslint-disable-next-line flowtype/no-weak-types
  handleSearchRequest: Function
};

type State = {
  input: string
};

export default class InputSearch extends React.PureComponent<Props, State> {
  state = {
    input: ''
  };

  updateSearchInput = debounce(() => {
    const { input } = this.state;
    const { handleSearchRequest } = this.props;
    handleSearchRequest(input);
  }, LIMIT_TIME);

  onChange = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { value } = evt.target;
    this.setState(
      {
        input: value
      },
      this.updateSearchInput
    );
  };

  render() {
    debug(`render`);
    const { inputRoot, inputInput } = this.props;
    const { input } = this.state;

    return (
      <TextField
        value={input}
        fullWidth
        placeholder="Search by asset name or symbol"
        margin="normal"
        InputProps={{
          className: inputInput
        }}
        classes={{
          root: inputRoot
        }}
        onChange={this.onChange}
      />
    );
  }
}
