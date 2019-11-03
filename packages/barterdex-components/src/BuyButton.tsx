import * as React from 'react';
import classNames from 'classnames';
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

// interface IBuyButtonProps {
//   classes: Object,
//   children: React.ReactNode,
//   readonly onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
//   readonly className?: string
// };

class BuyButton extends React.PureComponent<any> {
  static displayName = 'BuyButton';

  static defaultProps = {
    className: ''
  };

  private onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }

  public render() {
    debug(`render`);

    const { classes, className, children, onClick, ...other } = this.props;
    const classesButton = classNames(classes.buyButton, className);

    return (
      <Button
        className={classesButton}
        color="primary"
        variant="contained"
        onClick={this.onClick}
        {...other}
      >
        {children}
      </Button>
    );
  }
}

export default withStyles(styles)(BuyButton);
