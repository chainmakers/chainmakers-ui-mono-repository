import * as React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  tabContainer: {
    display: 'none',
    '&.isActive': {
      display: 'block'
    }
  }
});

const debug = require('debug')('atomicapp:components:Tabs:TabContainer');

interface IBuyTabContainerProps {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  children: React.ReactElement<any>,
  className?: string,
  selected?: boolean
};

export class TabContainer extends React.PureComponent<IBuyTabContainerProps> {

  static displayName = 'TabContainer';

  static defaultProps = {
    className: '',
    selected: false
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
    const classContainer = classNames(
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

export default withStyles(styles)(TabContainer);
