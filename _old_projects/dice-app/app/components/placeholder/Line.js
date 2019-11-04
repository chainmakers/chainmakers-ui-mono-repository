// @flow
import React, { PureComponent } from 'react';
import ClassNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Animation from './Animation';

const styles = () => ({
  placeholder__line: {
    height: 10,
    margin: '10px 0'
  },

  placeholder__width60: {
    width: 60
  },

  placeholder__width90: {
    width: 90
  },

  placeholder__width110: {
    width: 110
  },

  placeholder__width120: {
    width: 120
  },

  placeholder__width160: {
    width: 160
  },

  placeholder__width190: {
    width: 190
  },

  placeholder__width220: {
    width: 220
  },

  placeholder__width250: {
    width: 250
  },

  placeholder__width270: {
    width: 270
  },

  placeholder__width300: {
    width: 300
  },

  placeholder__width340: {
    width: 340
  },

  placeholder__width470: {
    width: 470
  },

  placeholder__width500: {
    width: 500
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  className?: string,
  width?: number
};

class Line extends PureComponent<Props> {
  static defaultProps = {
    width: 500,
    className: ''
  };

  render() {
    const { className, classes, width, ...props } = this.props;
    const classesLine = ClassNames(
      classes.placeholder__line,
      {
        [classes.placeholder__width60]: width === 60,
        [classes.placeholder__width90]: width === 90,
        [classes.placeholder__width110]: width === 110,
        [classes.placeholder__width120]: width === 120,
        [classes.placeholder__width160]: width === 160,
        [classes.placeholder__width190]: width === 190,
        [classes.placeholder__width220]: width === 220,
        [classes.placeholder__width250]: width === 250,
        [classes.placeholder__width270]: width === 270,
        [classes.placeholder__width300]: width === 300,
        [classes.placeholder__width340]: width === 340,
        [classes.placeholder__width470]: width === 470,
        [classes.placeholder__width500]: width === 500
      },
      className
    );

    return <Animation className={classesLine} {...props} />;
  }
}

Line.displayName = 'placeholder(Line)';

export default withStyles(styles)(Line);
