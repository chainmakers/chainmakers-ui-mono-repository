// @flow
import React, { PureComponent } from 'react';
import ClassNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { getCoinIcon } from '../../../components/CryptoIcons';
import { covertSymbolToName } from '../../../utils/coin';

const debug = require('debug')('dicoapp:containers:WalletPage:Asset');

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  },

  iconSmall: {
    fontSize: 20
  },

  actions: {
    display: 'flex'
  },

  wallet__headerAction: {
    margin: '0 auto'
  },

  wallet__balance: {
    color: 'rgba(0, 0, 0, 0.74)',
    fontSize: '1.725rem',
    fontWeight: 400,
    lineHeight: 1.17,
    letterSpacing: '0.00735em',
    marginBottom: 0
  },

  wallet__content: {
    paddingTop: 8,
    paddingBottom: 8
  },

  wallet__title: {
    lineHeight: '1.31429em',
    fontSize: '1.3125rem'
  },

  wallet__subheader: {
    lineHeight: '1.31429em'
  },

  wallet__button: {
    boxShadow: 'none',
    color: 'rgba(0, 0, 0, 0.54)',
    fontWeight: 400,
    '&:hover': {
      color: theme.palette.primary.main,
      fontWeight: 500
    }
  },

  wallet__card: {
    border: '1px solid #dadce0',
    boxShadow: 'none'
    // '&:hover': {
    //   boxShadow:
    //     '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    //   cursor: 'pointer'
    // }
  },

  wallet__buttonBorder: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
    margin: '0px 16px',
    height: '100%',
    minHeight: 20
  },

  wallet__firstButton: {
    marginLeft: 4
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  data: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  openWithdraw: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  openDeposit: Function
};

class Asset extends PureComponent<Props> {
  openWithdraw = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { openWithdraw, data } = this.props;
    const coin = data.get('coin');
    openWithdraw(coin);
  };

  openDeposit = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { openDeposit, data } = this.props;
    const coin = data.get('coin');
    openDeposit(coin);
  };

  render() {
    debug(`render`);

    const { classes, data } = this.props;
    const CIcon = getCoinIcon(data.get('coin'));

    return (
      <Card className={classes.wallet__card}>
        <CardHeader
          classes={{
            action: classes.wallet__headerAction,
            title: classes.wallet__title,
            subheader: classes.wallet__subheader
          }}
          action={CIcon}
          title={covertSymbolToName(data.get('coin'))}
          subheader={data.get('coin')}
        />
        <CardContent className={classes.wallet__content}>
          <Typography
            variant="h1"
            gutterBottom
            className={classes.wallet__balance}
          >
            {data.get('balance')} {data.get('coin')}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button
            className={ClassNames(
              classes.wallet__button,
              classes.wallet__firstButton
            )}
            size="small"
            color="primary"
            onClick={this.openDeposit}
          >
            Deposit
          </Button>
          <div className={classes.wallet__buttonBorder} />
          <Button
            className={classes.wallet__button}
            size="small"
            color="primary"
            onClick={this.openWithdraw}
          >
            Withdraw
          </Button>
        </CardActions>
      </Card>
    );
  }
}

Asset.displayName = 'Asset';

export default withStyles(styles)(Asset);
