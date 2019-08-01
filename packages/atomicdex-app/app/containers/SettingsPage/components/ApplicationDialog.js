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
import { closeApplicationDialog } from '../actions';
import { useSettingsContext } from '../reducer';
import { selectApplicationState } from '../selectors';

const useStyles = makeStyles(() => ({
  applicationDialog__minwidth: {
    minWidth: 600
  }
}));

type IApplicationDialogProps = {};

function ApplicationDialog(props: IApplicationDialogProps) {
  const classes = useStyles();

  const [state, dispatch] = useSettingsContext();

  const [logText, setLogText] = React.useState('');

  const onClickCloseApplicationDialog = (evt: SyntheticInputEvent<*>) => {
    evt.preventDefault();
    dispatch(closeApplicationDialog());
  };

  async function getLogs() {
    const lt = await ipc.callMain('read-application-logs');
    setLogText(lt);
  }

  React.useEffect(() => {
    getLogs();
  }, []);

  async function onClickOpenFullLog() {
    await ipc.callMain('open-app-folder');
  }

  return (
    <Dialog
      // fullWidth={true}
      maxWidth="sm"
      open={selectApplicationState(state)}
      onClose={onClickCloseApplicationDialog}
      aria-labelledby="application-dialog-title"
      classes={{
        paper: classes.applicationDialog__minwidth
      }}
    >
      <DialogTitle id="application-dialog-title">Application</DialogTitle>
      <DialogContent>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemText primary="Version" />
            <ListItemSecondaryAction>0.23.0</ListItemSecondaryAction>
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
          {logText}
        </pre>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClickCloseApplicationDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ApplicationDialog.defaultProps = {};

ApplicationDialog.displayName = 'SettingsPage__ApplicationDialog';

export default ApplicationDialog;
