// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const debug = require('debug')(
  'atomicapp:components:JoyrideModal:JoyrideTooltip'
);

const styles = theme => ({
  joyrideTooltip__card: {
    borderRadius: 0,
    width: '100%',
    textAlign: 'center',
    boxShadow: 'none',
    position: 'fixed',
    bottom: 0,
    zIndex: theme.zIndex.tooltip
  },

  joyrideTooltip__closedIcon: {
    top: 8,
    right: 8,
    color: '#9e9e9e',
    position: 'absolute'
  },

  joyrideTooltip__content: {
    display: 'flex',
    padding: '8px 88px',
    background: '#fafafa',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 120
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
      <Fade in={inProp} timeout={350}>
        <Card
          className={classes.joyrideTooltip__card}
          style={{
            visibility: !inProp ? 'hidden' : undefined
          }}
        >
          <IconButton
            onClick={onSkip}
            className={classes.joyrideTooltip__closedIcon}
          >
            <ClearIcon />
          </IconButton>
          <div className={classes.joyrideTooltip__content}>
            <IconButton size="small" color="primary" onClick={onPrev}>
              <KeyboardArrowLeft />
            </IconButton>
            <div>
              <Typography variant="overline" gutterBottom>
                {`Step ${index} of ${total}`}
              </Typography>

              <Typography variant="h5" component="h2" gutterBottom>
                {title}
              </Typography>
              <Typography component="p" gutterBottom>
                {message}
              </Typography>
            </div>
            <IconButton size="small" color="primary" onClick={onNext}>
              <KeyboardArrowRight />
            </IconButton>
          </div>
        </Card>
      </Fade>
    );
  }
}

export default withStyles(styles)(JoyrideTooltip);
