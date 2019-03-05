// @flow
import React from 'react';
import type { Node } from 'react';
import Toolbar from '@material-ui/core/Toolbar';

type Props = {
  title: Node,
  // eslint-disable-next-line flowtype/no-weak-types
  children: Element<any>
};

class Header extends React.PureComponent<Props> {
  render() {
    const { title, children } = this.props;

    return (
      <Toolbar>
        {title}
        {children}
      </Toolbar>
    );
  }
}

export default Header;
