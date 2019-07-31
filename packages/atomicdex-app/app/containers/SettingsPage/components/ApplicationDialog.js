// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

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
  }
}));

type IApplicationDialogProps = {
  open: booean,
  closeDialog: Function
};

export default function ApplicationDialog(props: IApplicationDialogProps) {
  const classes = useStyles();
  const [logs, setLogs] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  async function getLogs() {
    console.log('run only once');
    const logs = await ipc.callMain('read-application-logs');
    setLogs(logs);
  }

  React.useEffect(() => {
    getLogs();
  }, []);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleMaxWidthChange(event) {
    setMaxWidth(event.target.value);
  }

  function handleFullWidthChange(event) {
    setFullWidth(event.target.checked);
  }

  async function onClickOpenFullLog() {
    await ipc.callMain('open-application-folder');
  }

  return (
    <Dialog
      // fullWidth={true}
      maxWidth="sm"
      open={props.open}
      onClose={props.closeDialog}
      aria-labelledby="max-width-dialog-title"
      style={{
        minWidth: 600
      }}
    >
      <DialogTitle id="max-width-dialog-title">Application</DialogTitle>
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

        {/* <DialogContentText
          style={{
            borderRadius: 1,
            padding: 12,
            // justify-content: center;
            backgroundColor: '#f5f5f5',
            // overflow: 'auto'
          }}
        > */}
        <pre
          style={{
            borderRadius: 1,
            padding: 12,
            // justify-content: center;
            backgroundColor: '#f5f5f5',
            overflowX: 'auto'
          }}
        >
          {logs}
        </pre>
        {/* </DialogContentText> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
