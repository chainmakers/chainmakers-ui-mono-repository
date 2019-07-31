// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import LanguageIcon from '@material-ui/icons/Language';
import FeedbackIcon from '@material-ui/icons/Feedback';
import HttpsIcon from '@material-ui/icons/Https';
import CodeIcon from '@material-ui/icons/Code';
import SecurityIcon from '@material-ui/icons/Security';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import api from 'utils/barterdex-api';
import PageSectionTitle from '../../../components/PageSectionTitle';
import { version } from '../../../../package.json';
import { openApplicationDialog, openMM2Dialog } from '../actions';
import { useSettingsContext } from '../reducer';

const debug = require('debug')('atomicapp:containers:DexPage:MyOrders');

const useStyles = makeStyles(() => ({
  container: {
    // marginTop: 65,
    marginTop: 112,
    padding: '40px 24px 24px 24px'
  },

  containerSection: {
    // paddingBottom: 30
  }
}));

type IAboutTabProps = {};

function AboutTab(props: IAboutTabProps) {
  const classes = useStyles();

  const [state, dispatch] = useSettingsContext();

  const [mm2, setMM2Version] = React.useState('N/A');

  async function getMM2Version() {
    const { result } = await api.version();
    setMM2Version(result);
  }

  React.useEffect(() => {
    getMM2Version();
  }, []);

  const onClickOpenApplicationDialog = (evt: SyntheticInputEvent<*>) => {
    evt.preventDefault();
    dispatch(openApplicationDialog());
  };

  const onClickOpenMM2Dialog = (evt: SyntheticInputEvent<*>) => {
    evt.preventDefault();
    dispatch(openMM2Dialog());
  };

  const onClickFeedback = async (evt: SyntheticInputEvent<*>) => {
    evt.preventDefault();
    // const c = await ipc.callMain('open-new-github-issue');
    await ipc.callMain('open-new-github-issue');
  };

  const onClickOpensource = async (evt: SyntheticInputEvent<*>) => {
    evt.preventDefault();
    await ipc.callMain('open-source-code');
  };

  const onClickDiscordChannel = async (evt: SyntheticInputEvent<*>) => {
    evt.preventDefault();
    await ipc.callMain('open-discord-channel');
  };

  debug('render');

  return (
    <Grid container spacing={0} className={classes.container}>
      <Grid item xs={12} className={classes.containerSection}>
        <PageSectionTitle disableBottom title="Application" />
        <List disablePadding component="nav" aria-label="main mailbox folders">
          <ListItem disableGutters>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText
              primary="Languages"
              secondary="Select your language"
            />
            <ListItemSecondaryAction>
              <FormControl className={classes.margin}>
                <Select
                  value={10}
                  input={<OutlinedInput name="age" id="outlined-age-simple" />}
                >
                  <MenuItem value={10}>English</MenuItem>
                </Select>
              </FormControl>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button disableGutters onClick={onClickFeedback}>
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText
              primary="Feedback"
              secondary="Please feel free to send us your feedback"
            />
          </ListItem>
          <ListItem button disableGutters onClick={onClickOpensource}>
            <ListItemIcon>
              <CodeIcon />
            </ListItemIcon>
            <ListItemText primary="Source code" />
          </ListItem>
          <ListItem button disableGutters>
            <ListItemIcon>
              <HttpsIcon />
            </ListItemIcon>
            <ListItemText primary="Terms of service" />
          </ListItem>
          <ListItem button disableGutters>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText primary="Privacy policy" />
          </ListItem>
        </List>
        <Divider />
        <List
          disablePadding
          component="nav"
          subheader={<ListSubheader disableGutters>About</ListSubheader>}
          aria-label="secondary mailbox folders"
        >
          <ListItem button disableGutters>
            <ListItemText primary="Discord" onClick={onClickDiscordChannel} />
            <ListItemSecondaryAction>
              <Link href="https://discord.gg/nAPmwPC">
                https://discord.gg/nAPmwPC
              </Link>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button disableGutters onClick={onClickOpenMM2Dialog}>
            <ListItemText primary="MM2 version" />
            <ListItemSecondaryAction>{mm2}</ListItemSecondaryAction>
          </ListItem>
          <ListItem
            button
            disableGutters
            onClick={onClickOpenApplicationDialog}
          >
            <ListItemText primary="Build version" />
            <ListItemSecondaryAction>{version}</ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

AboutTab.defaultProps = {};

AboutTab.displayName = 'SettingsPage__AboutTab';

export default AboutTab;
