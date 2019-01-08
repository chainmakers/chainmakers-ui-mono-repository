// @flow
import React from 'react';
import type { Element } from 'react';
import ClassNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  tabContainer: {
    display: 'none',
    '&.isActive': {
      display: 'block'
    }
  }
});

const debug = require('debug')('atomicapp:containers:BuyPage:TabContainer');

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  children: Element<any>,
  className?: string,
  selected: boolean
};

type State = {};

export class TabContainer extends React.PureComponent<Props, State> {
  static defaultProps = {
    className: ''
  };

  // shouldComponentUpdate(nextProps) {
  //   // NOTE: always render when selected === true
  //   const { selected } = this.props;
  //   if (selected !== nextProps.selected || nextProps.selected) {
  //     return true;
  //   }
  //   return false;
  // }

  render() {
    debug('render');

    const { children, classes, className, selected, ...other } = this.props;
    const classContainer = ClassNames(
      classes.tabContainer,
      {
        isActive: selected
      },
      className
    );

    return (
      <div className={classContainer} {...other}>
        {children}
      </div>
    );
  }
}

TabContainer.displayName = 'TabContainer';

export default withStyles(styles)(TabContainer);
