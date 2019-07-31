// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import api from 'utils/barterdex-api';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content'
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing(1)
  },

  minwidth: {
    minWidth: 600
  }
}));

type IMM2DialogProps = {
  open: booean,
  closeDialog: Function
};

export default function MM2Dialog(props: IMM2DialogProps) {
  const classes = useStyles();
  const [logText, setLogText] = React.useState('');
  const [mm2, setMM2Version] = React.useState('N/A');

  async function getMM2Version() {
    const { result } = await api.version();
    setMM2Version(result);
  }

  async function getLogs() {
    const lt = await ipc.callMain('read-mm2-logs');
    setLogText(lt);
  }

  React.useEffect(() => {
    getLogs();
  }, []);

  React.useEffect(() => {
    getMM2Version();
  }, []);

  async function onClickOpenFullLog() {
    await ipc.callMain('open-mm2-folder');
  }

  return (
    <Dialog
      // fullWidth={true}
      maxWidth="sm"
      open={props.open}
      onClose={props.closeDialog}
      aria-labelledby="max-width-dialog-title"
      classes={{
        paper: classes.minwidth
      }}
    >
      <DialogTitle id="max-width-dialog-title">MM2 Application</DialogTitle>
      <DialogContent>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemText primary="Version" />
            <ListItemSecondaryAction>{mm2}</ListItemSecondaryAction>
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="Logs" />
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                color="primary"
                onClick={onClickOpenFullLog}
              >
                Open full logs
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <pre
          style={{
            borderRadius: 1,
            padding: 12,
            backgroundColor: '#f5f5f5',
            overflowX: 'auto'
          }}
        >
          <code>{logText}</code>
        </pre>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
