// @flow
import React from 'react';
import type { Node } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

type IHeaderProps = {
  title: Node
};

class Header extends React.PureComponent<IHeaderProps> {
  render() {
    const { title } = this.props;

    return (
      <Toolbar>
        <Typography variant="h6" color="inherit">
          {title}
        </Typography>
      </Toolbar>
    );
  }
}

export default Header;
