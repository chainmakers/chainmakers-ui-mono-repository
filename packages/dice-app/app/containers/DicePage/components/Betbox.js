// @flow
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

const styles = {
  betbox__container: {
    borderRadius: 8,
    padding: 25,
    backgroundColor: '#fff',
  },

  betbox__debugline: {
    // border: '1px solid red'
  },

  betbox__label: {
    lineHeight: 1,
    marginBottom: 10
  },

  betbox__input: {
    padding: '15px 14px'
  },

  betbox__betAmountInput: {
    width: '90%'
  },

  betbox__rowCenter: {
    margin: '30px 0',
    borderRadius: 8,
    padding: '10px 0'
  },

  betbox__number: {
    color: 'rgba(0, 0, 0, 0.74)',
    fontSize: '1.725rem',
    fontWeight: 400,
    lineHeight: 1.17,
    letterSpacing: '0.00735em',
    marginBottom: 0
  },

  betbox__borderLeft: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.1)'
  },

  betbox__textCenter: {
    textAlign: 'center'
  },

  betbox__betButton: {
    boxShadow: 'none',
    padding: '12px 24px'
  },
};

type IBetboxProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

class Betbox extends React.PureComponent<IBetboxProps> {

  render() {
    const { classes } = this.props;

    return (
      <Grid item lg={7} md={8} sm={12} className={classes.betbox__container}>
        <Grid container spacing={0}>
          <Grid item xs={7} className={classes.betbox__debugline}>
            <Typography variant="overline" className={classes.betbox__label}>
              BET AMOUNT
            </Typography>
            <TextField
              variant="outlined"
              margin="none"
              value={0}
              className={classes.betbox__betAmountInput}
              inputProps={{
                className: classes.betbox__input
              }}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button>1/2</Button>
                    <Button>2X</Button>
                    <Button>MAX</Button>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={5} className={classes.betbox__debugline}>
            <Typography variant="overline" className={classes.betbox__label}>
              PAYOUT ON WIN
            </Typography>
            <TextField
              disabled
              variant="outlined"
              margin="none"
              fullWidth
              value={"1000.00"}
              inputProps={{
                className: classes.betbox__input
              }}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    KMDICE
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid
            container
            spacing={0}
            className={classNames(classes.betbox__textCenter, classes.betbox__rowCenter)}
          >
            <Grid
              item
              xs={4}
              className={classes.betbox__debugline}
            >
              <Typography variant="overline">ROLL NUMBER TO WIN</Typography>
              <Typography variant="h5" className={classes.betbox__number}>
                1000
              </Typography>
            </Grid>

            <Grid
              item
              xs={4}
              className={classNames(
                classes.betbox__borderLeft,
                classes.betbox__debugline
              )}
            >
              <Typography variant="overline">PAYOUT</Typography>
              <Typography variant="h5" className={classes.betbox__number}>
                777.0x
              </Typography>
            </Grid>

            <Grid
              item
              xs={4}
              className={classNames(
                classes.betbox__borderLeft,
                classes.betbox__debugline
              )}
            >
              <Typography variant="overline">WIN CHANCE</Typography>
              <Typography variant="h5" className={classes.betbox__number}>
                1/1000
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={0} className={classes.betbox__textCenter}>
            <Grid
              item
              xs={4}
              container
              alignItems="center"
              justify="center"
              className={classes.betbox__debugline}
            >
              <Typography variant="overline" className={classes.betbox__label}>
                PLACE NUMBER TO BET
              </Typography>
              <TextField
                margin="none"
                variant="outlined"
                value={1000}
                fullWidth
                inputProps={{
                  className: classes.betbox__input
                }}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>

            <Grid
              item
              xs={4}
              container
              alignItems="flex-end"
              justify="center"
              className={classes.betbox__debugline}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                classes={{
                  root: classes.betbox__betButton
                }}
              >
                ROLL DICE
              </Button>
            </Grid>

            <Grid
              item
              xs={4}
              className={classes.betbox__debugline}
            >
              <Typography variant="overline" className={classes.betbox__label}>
                Balance
              </Typography>
              <Typography
                variant="h5"
                className={classes.betbox__number}
                style={{
                  lineHeight: 2
                }}
              >
                50.12345678
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Betbox);
