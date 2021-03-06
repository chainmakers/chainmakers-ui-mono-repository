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
import { closeMM2Dialog } from '../actions';
import { useSettingsContext } from '../reducer';
import { selectMM2State, selectMM2Version } from '../selectors';

const useStyles = makeStyles(() => ({
  mm2Dialog__minwidth: {
    minWidth: 600
  }
}));

function MM2Dialog() {
  const classes = useStyles();

  const [state, dispatch] = useSettingsContext();

  const [logText, setLogText] = React.useState('');
  const [userpass, setUserpass] = React.useState('');

  const onClickCloseMM2Dialog = (evt: SyntheticInputEvent<*>) => {
    evt.preventDefault();
    dispatch(closeMM2Dialog());
  };

  async function getLogs() {
    const lt = await ipc.callMain('read-mm2-logs');
    setLogText(lt);
  }

  async function getUserpass() {
    const userpass = api.getUserpass();
    setUserpass(userpass);
  }

  React.useEffect(() => {
    getLogs();
    getUserpass();
  }, []);

  async function onClickOpenFullLog() {
    await ipc.callMain('open-mm2-folder');
  }

  return (
    <Dialog
      // fullWidth={true}
      maxWidth="sm"
      open={selectMM2State(state)}
      onClose={onClickCloseMM2Dialog}
      aria-labelledby="mm2-dialog-title"
      classes={{
        paper: classes.mm2Dialog__minwidth
      }}
    >
      <DialogTitle id="mm2-dialog-title">MM2 Application</DialogTitle>
      <DialogContent>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemText primary="Version" />
            <ListItemSecondaryAction>
              {selectMM2Version(state)}
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="Userpass" secondary={userpass}/>
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
        <Button onClick={onClickCloseMM2Dialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

MM2Dialog.defaultProps = {};

MM2Dialog.displayName = 'SettingsPage__MM2Dialog';

export default MM2Dialog;
