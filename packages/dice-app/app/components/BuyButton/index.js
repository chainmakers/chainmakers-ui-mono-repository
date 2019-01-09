// @flow
import React from 'react';
import ClassNames from 'classnames';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const debug = require('debug')('atomicapp:components:BuyButton');

const styles = () => ({
  buyButton: {
    boxShadow: 'none',
    width: '50%',
    borderRadius: 4,
    padding: '25px 35px'
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  children: Node,
  // eslint-disable-next-line flowtype/no-weak-types
  onClick?: Function,
  className?: string
};

class BuyButton extends React.PureComponent<Props> {
  static defaultProps = {
    className: '',
    onClick: () => {}
  };

  render() {
    debug(`render`);

    const { classes, className, children, onClick, ...props } = this.props;
    const classesButton = ClassNames(classes.buyButton, className);

    return (
      <Button
        className={classesButton}
        color="primary"
        variant="contained"
        onClick={onClick}
        {...props}
      >
        {children}
      </Button>
    );
  }
}

BuyButton.displayName = 'BuyButton';

export default withStyles(styles)(BuyButton);
