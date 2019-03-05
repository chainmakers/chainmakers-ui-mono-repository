// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import { getElement } from './dom';

const debug = require('debug')(
  'atomicapp:containers:WalletPage:components:JoyrideModal:JoyrideTooltip'
);

const styles = theme => ({
  joyrideTooltip__popper: {
    zIndex: theme.zIndex.tooltip
  },

  joyrideTooltip__card: {
    margin: 16,
    width: 380,
    textAlign: 'center',
    boxShadow: 'none'
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto'
  }
});

type IJoyrideTooltipProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  message: string,
  title: string,
  id: string,
  in: boolean,
  index: number,
  total: number,
  // eslint-disable-next-line flowtype/no-weak-types
  onNext: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  onPrev: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  onSkip: Function
};

class JoyrideTooltip extends React.PureComponent<IJoyrideTooltipProps> {
  static displayName = 'JoyrideTooltip';

  static defaultProps = {};

  state = {
    anchorEl: null
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.id) {
      const currentTarget = getElement(nextProps.id);
      return {
        anchorEl: currentTarget
      };
    }
    // No state update necessary
    return null;
  }

  // componentDidMount() {
  //   const currentTarget = getElement(this.props.id);
  //   this.setState({
  //     anchorEl: currentTarget
  //   });
  // }

  // componentDidUpdate() {
  //   const currentTarget = getElement(this.props.id);
  //   this.setState({
  //     anchorEl: currentTarget
  //   });
  // }

  render() {
    debug(`render`);
    const {
      classes,
      in: inProp,
      message,
      title,
      index,
      total,
      onNext,
      onPrev,
      onSkip
    } = this.props;
    const { anchorEl } = this.state;

    return (
      <Popper
        open={inProp}
        anchorEl={anchorEl}
        placement="bottom"
        transition
        className={classes.joyrideTooltip__popper}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Card className={classes.joyrideTooltip__card}>
              <CardHeader title={title} />
              <CardContent>
                <Typography component="p">{message}</Typography>
              </CardContent>
              <CardActions disableActionSpacing>
                <Button size="small" color="primary" onClick={onSkip}>
                  Skip
                </Button>
                <div className={classes.expand}>
                  <Button size="small" color="primary" onClick={onPrev}>
                    Prev
                  </Button>
                  <Button size="small" color="primary" onClick={onNext}>
                    Next ({index}/{total})
                  </Button>
                </div>
              </CardActions>
            </Card>
          </Fade>
        )}
      </Popper>
    );
  }
}

export default withStyles(styles)(JoyrideTooltip);
