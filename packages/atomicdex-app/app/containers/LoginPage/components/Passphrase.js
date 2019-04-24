// @flow
import React from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

const debug = require('debug')('atomicapp:containers:LoginPage:Passphrase');

type IPassphraseProps = {
  loading: boolean,
  className: string,
  passphrase: string,
  // eslint-disable-next-line flowtype/no-weak-types
  onChange: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  onKeyPress: Function
};

type IPassphraseState = {
  showPassword: boolean
};

export default class Passphrase extends React.PureComponent<
  IPassphraseProps,
  IPassphraseState
> {
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
    const { loading, className, passphrase, onChange, onKeyPress } = this.props;
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
          onKeyPress={onKeyPress}
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
