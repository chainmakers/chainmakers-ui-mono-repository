// @flow
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  buyTabs__tab: {
    minWidth: 100
  },

  buyTabs__labelContainer: {
    paddingLeft: 12,
    paddingRight: 12
  }
});

type IHeaderTabsProps = {
  classes: Styles,
  // eslint-disable-next-line flowtype/no-weak-types
  handleChange: Function,
  value: number
};

class HeaderTabs extends React.PureComponent<IHeaderTabsProps> {
  render() {
    const { value, classes, handleChange } = this.props;
    return (
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab
          classes={{
            labelContainer: classes.buyTabs__labelContainer
          }}
          label="Portfolio"
          className={classes.buyTabs__tab}
        />
        <Tab label="Transactions" className={classes.buyTabs__tab} />
      </Tabs>
    );
  }
}

export default withStyles(styles)(HeaderTabs);
