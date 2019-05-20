// @flow
import React from 'react';
import type { Node } from 'react';
import ClassNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const debug = require('debug')('atomicapp:containers:DexPage:CoinSelectable');

const styles = () => ({
  btn: {
    width: 184,
    height: 152,
    padding: '20px 30px',
    marginRight: 20,
    marginBottom: 20,
    border: '1px solid #dadce0',
    cursor: 'pointer',
    borderRadius: 8,
    position: 'relative'
  },

  btnSelected: {
    borderColor: '#80BB41'
  },

  btnDisabled: {
    color: 'rgba(0, 0, 0, 0.26)'
  },

  btn__content: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  btn__title: {
    margin: '5px 0px'
  },

  btn__subtitle: {
    marginTop: 8
  },

  btn__selected: {
    position: 'absolute',
    top: -12,
    right: -12,
    borderColor: '#fff',
    backgroundColor: '#80BB41',
    color: '#fff',
    borderRadius: 12
  }
});

type Props = {
  id?: string | null,
  key: string,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  icon: Node,
  selected?: boolean,
  disabled?: boolean,
  title?: Node | null,
  subTitle?: Node | null,
  // eslint-disable-next-line flowtype/no-weak-types
  onClick?: Function | null,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadPrice?: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  data?: string,
  className?: string,
  price?: Node | null
};

class CoinSelectable extends React.PureComponent<Props> {
  static defaultProps = {
    id: null,
    title: null,
    subTitle: null,
    price: null,
    selected: false,
    disabled: false,
    onClick: null,
    data: '',
    className: '',
    dispatchLoadPrice: () => {}
  };

  static displayName = 'CoinSelectable';

  componentDidMount = () => {
    const { dispatchLoadPrice, data } = this.props;
    if (dispatchLoadPrice) {
      dispatchLoadPrice(data);
    }
  };

  onClick = (evt: SyntheticInputEvent<>) => {
    const { onClick, data } = this.props;
    if (onClick) {
      if (data) {
        // eslint-disable-next-line no-param-reassign
        evt.target.value = data;
      }
      onClick(evt);
    }
  };

  render() {
    debug(`render`);

    const {
      id,
      key,
      classes,
      className,
      icon,
      title,
      subTitle,
      selected,
      disabled,
      price
    } = this.props;

    const buttonClasses = ClassNames(classes.btn, className, {
      [classes.btnSelected]: selected,
      [classes.btnDisabled]: disabled
    });

    return (
      <ButtonBase
        id={id}
        disabled={disabled}
        focusRipple
        key={key}
        className={buttonClasses}
        focusVisibleClassName={classes.focusVisible}
        onClick={this.onClick}
      >
        <span className={classes.btn__content}>
          {icon}
          {title && (
            <Typography
              component="div"
              variant="h6"
              color="inherit"
              className={classes.btn__title}
            >
              {title}
            </Typography>
          )}
          {subTitle && (
            <Typography
              component="div"
              variant="subtitle1"
              color="inherit"
              className={classes.btn__subtitle}
            >
              {subTitle}
            </Typography>
          )}
          {price}
        </span>
        {selected && (
          <CheckCircleOutlineIcon className={classes.btn__selected} />
        )}
      </ButtonBase>
    );
  }
}

export default withStyles(styles)(CoinSelectable);
