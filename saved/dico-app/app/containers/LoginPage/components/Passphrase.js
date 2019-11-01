// @flow
import React, { Component } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

const debug = require('debug')('dicoapp:containers:LoginPage:Passphrase');

type Props = {
  loading: boolean,
  className: string,
  passphrase: string,
  // eslint-disable-next-line flowtype/no-weak-types
  onChange: Function
};

type State = {
  showPassword: boolean
};

class Passphrase extends Component<Props, State> {
  props: Props;

  state = {
    showPassword: false
  };

  handleMouseDownPassword = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    debug('render');
    const { loading, className, passphrase, onChange } = this.props;
    const { showPassword } = this.state;

    return (
      <FormControl disabled={loading} fullWidth className={className}>
        <InputLabel htmlFor="login-adornment-passphrase">Passphrase</InputLabel>
        <Input
          fullWidth
          id="login-adornment-passphrase"
          type={showPassword ? 'text' : 'password'}
          value={passphrase}
          onChange={onChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle passphrase visibility"
                onClick={this.handleClickShowPassword}
                onMouseDown={this.handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
  }
}

export default Passphrase;
