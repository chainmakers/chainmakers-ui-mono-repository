// @flow
import React, { PureComponent } from 'react';
import ClassNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Animation from './Animation';

const styles = () => ({
  placeholder__circle: {
    borderRadius: '50%',
    display: 'inline-block',
    verticalAlign: 'middle',
    width: 56,
    height: 56
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  style?: Object,
  className?: string
};

class Circle extends PureComponent<Props> {
  static defaultProps = {
    className: '',
    style: {}
  };

  render() {
    const { className, classes, style } = this.props;
    const classesCircle = ClassNames(classes.placeholder__circle, className);

    return <Animation className={classesCircle} style={style} />;
  }
}

Circle.displayName = 'placeholder(Circle)';

export default withStyles(styles)(Circle);
