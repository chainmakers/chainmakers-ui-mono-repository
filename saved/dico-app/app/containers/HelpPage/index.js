// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ErrorBoundary from '../../components/ErrorBoundary';
import MDCAppBar from '../../components/AppBar';
import MDCHeader from '../../components/AppBar/Header';
import PageSectionTitle from '../../components/PageSectionTitle';
import { NavigationLayout } from '../Layout';

const styles = {
  container: {
    marginTop: 65,
    padding: '40px 24px 24px 24px'
  },

  containerSection: {
    paddingBottom: 30
  }
};

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

class HelpPage extends Component<Props> {
  props: Props;

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid container spacing={0} className={classes.container}>
          <Grid item xs={12} className={classes.containerSection}>
            <PageSectionTitle title="Pre-Login Instructions:" />
            <Typography variant="body1" gutterBottom>
              <ol>
                <li>Click Create Account</li>
                <li>Click Generate</li>
                <li>
                  Save Seed and WIF key and go back to Login. Warning: If you
                  lose your Seed you will lose access to your funds/tokens. Keep
                  it safe!
                </li>
                <li>Login with your new Seed</li>
              </ol>
            </Typography>
            <PageSectionTitle title="After Login:" />
            <Typography variant="body1" gutterBottom>
              <ol>
                <li>Choose the coin you want to deposit</li>
                <li>
                  Once your deposit has confirmed, you will be able to see your
                  balance in the top part of the wallet tab. Afterwards, you can
                  navigate to the BUY tab and wait for order-books to sync
                </li>
                <li>
                  When the order books are synced you will see the price per GLX
                  Token and the order section will be enabled.
                </li>
                <li>
                  After the BUY tab is activated, you must input the amount of
                  funds you want to spend on GLX Token. For this demonstration
                  we will use buy 0.1 KMD of GLX Token. In the crowdfund you
                  will have pre-set minimum and maximum amounts per swap. After
                  typing the amount click BUY. A popup will tell you that the
                  BUY function will be locked for 3 minutes.
                </li>
                <li>
                  Your swap will begin the process of matching and confirming.
                  If the atomic swap does not match in 15 minutes it will
                  timeout
                </li>
              </ol>
            </Typography>
            <PageSectionTitle title="For more information and technical assistance please watch the instructional video below and join the GLX Token (GLXT) chat group at GLX.com:" />
            <ol>
              <li>
                <a
                  href="https://glx.li/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GLX Token Chat Group Instruction Video
                </a>
              </li>
            </ol>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const HelpPageWapper = withStyles(styles)(HelpPage);

const Index = () => (
  <NavigationLayout>
    <ErrorBoundary>
      <MDCAppBar>
        <MDCHeader
          title={
            <FormattedMessage id="dicoapp.containers.HelpPage.title">
              {(...content) => content}
            </FormattedMessage>
          }
        />
      </MDCAppBar>
      <HelpPageWapper />
    </ErrorBoundary>
  </NavigationLayout>
);

Index.propTypes = {};

Index.defaultProps = {};

export default Index;
