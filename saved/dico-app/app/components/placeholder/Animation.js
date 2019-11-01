// @flow
import React, { PureComponent } from 'react';
import ClassNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  placeholder__animation: {
    background: '#E1E9EE',
    animation: 'pulse .65s infinite alternate'
  },
  '@keyframes pulse': {
    '0%': {
      opacity: 0.5
    },
    '100%': {
      opacity: 1
    }
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  style?: Object,
  className?: string
};

class Animation extends PureComponent<Props> {
  static defaultProps = {
    style: {},
    className: ''
  };

  render() {
    const { className, style, classes } = this.props;
    const classesCircle = ClassNames(classes.placeholder__animation, className);

    return <div className={classesCircle} style={style} />;
  }
}

Animation.displayName = 'placeholder(Animation)';

export default withStyles(styles)(Animation);
