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

type IMM2DialogProps = {
  open: booean,
  closeDialog: Function
};

export default function MM2Dialog(props: IMM2DialogProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

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

  return (
    <Dialog
      // fullWidth={true}
      maxWidth
      open={props.open}
      onClose={props.closeDialog}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">MM2 Application</DialogTitle>
      <DialogContent>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemText primary="Version" />
            <ListItemSecondaryAction>0.23.0</ListItemSecondaryAction>
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="Logs" />
            <ListItemSecondaryAction>
              <Button variant="outlined" color="primary">
                Open full logs
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <DialogContentText>
          <pre>
            <code>
              30 08:21:44, lp_coins:669] ticker = "USDC", etomic, block_count =
              8250870 <br />
              30 08:21:44, lp_coins:669] ticker = "USDC", etomic, block_count =
              8250870 <br />
              30 08:21:44, common:732] RPC error response: rpc:213] No such
              method "listtransactions" <br />
              30 08:21:44, common:732] RPC error response: rpc:213] No such
              method "listtransactions" <br />
              30 08:21:44, common:732] RPC error response: rpc:213] No such
              method "listtransactions" <br />
              30 08:21:44, common:732] RPC error response: rpc:213] No such
              method "listtransactions" <br />
              30 08:21:46, common:732] RPC error response: rpc:213] No such
              method "listtransactions" <br />
              30 08:21:46, common:732] RPC error response: rpc:213] No such
              method "listtransactions" <br />
              30 08:21:44, common:732] RPC error response: rpc:213] No such
              method "listtransactions" <br />
              30 08:21:44, common:732] RPC error response: rpc:213] No such
              method "listtransactions" <br />
              30 08:21:44, common:732] RPC error response: rpc:213] No such
              method "listtransactions" <br />
              30 08:21:44, common:732] RPC error response: rpc:213] No such
              method "listtransactions" <br />
              30 08:21:46, common:732] RPC error response: rpc:213] No such
              method "listtransactions" <br />
              30 08:21:46, common:732] RPC error response: rpc:213] No such
              method "listtransactions" <br />
              30 08:21:44, common:732] RPC error response: rpc:213] No such
              method "listtransactions" <br />
              30 08:21:44, common:732] RPC error response: rpc:213] No such
              method "listtransactions" <br />
            </code>
          </pre>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
