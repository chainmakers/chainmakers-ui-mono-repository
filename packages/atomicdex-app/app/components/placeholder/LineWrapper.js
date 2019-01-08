// @flow
import React, { PureComponent } from 'react';
import type { ChildrenArray } from 'react';
import ClassNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  placeholder__lineWrapper: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: 10
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  className?: string,
  // eslint-disable-next-line flowtype/no-weak-types
  children?: ChildrenArray<any>
};

class LineWrapper extends PureComponent<Props> {
  static defaultProps = {
    className: '',
    children: null
  };

  render() {
    const { className, classes, children } = this.props;
    const classesLineWrapper = ClassNames(
      classes.placeholder__lineWrapper,
      className
    );

    return <div className={classesLineWrapper}>{children}</div>;
  }
}

LineWrapper.displayName = 'placeholder(LineWrapper)';

export default withStyles(styles)(LineWrapper);
