// @flow
import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  page__title: {
    marginBottom: 24,
    fontSize: 20
  }
});

type Props = {
  title: Node,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

class PageSectionTitle extends React.PureComponent<Props> {
  props: Props;

  static propTypes = {};

  render() {
    const { classes, title } = this.props;

    return (
      <Typography variant="h6" gutterBottom className={classes.page__title}>
        {title}
      </Typography>
    );
  }
}

export default withStyles(styles)(PageSectionTitle);
