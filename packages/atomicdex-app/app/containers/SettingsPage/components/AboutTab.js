// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

import api from 'utils/barterdex-api';

import PageSectionTitle from '../../../components/PageSectionTitle';
import { version } from '../../../../package.json';

const debug = require('debug')('atomicapp:containers:DexPage:MyOrders');

const styles = () => ({
  container: {
    // marginTop: 65,
    marginTop: 112,
    padding: '40px 24px 24px 24px'
  },

  containerSection: {
    // paddingBottom: 30
  },

  hr: {
    marginBottom: 20
  },

  cardContent: {
    position: 'relative',
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0
  },

  cardContent__rightBtn: {
    position: 'absolute',
    right: 0,
    top: -12
  },

  swapform__emptystate: {
    textAlign: 'center'
  },

  swapform__iconemptystate: {
    fontSize: 50
  }
});

type Props = {
  classes: Styles
};

class AboutTab extends React.PureComponent<Props> {
  state = {
    mm2Version: 'N/A'
  };

  async componentDidMount() {
    const { result } = await api.version();
    this.setState({
      mm2Version: result
    });
  }

  render() {
    debug('render');

    const { classes } = this.props;

    const { mm2Version } = this.state;

    return (
      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={12} className={classes.containerSection}>
          <PageSectionTitle disableBottom title="Application" />
          <List
            disablePadding
            component="nav"
            // subheader={
            //   <ListSubheader disableGutters>Application</ListSubheader>
            // }
            aria-label="main mailbox folders"
          >
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
                    input={
                      <OutlinedInput name="age" id="outlined-age-simple" />
                    }
                  >
                    <MenuItem value={10}>English</MenuItem>
                  </Select>
                </FormControl>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem button disableGutters>
              <ListItemIcon>
                <FeedbackIcon />
              </ListItemIcon>
              <ListItemText
                primary="Feedback"
                secondary="We appreciate your feedback"
              />
              {/* <ListItemSecondaryAction>
                123
              </ListItemSecondaryAction> */}
            </ListItem>
            <ListItem button disableGutters>
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary="Source code" />
              {/* <ListItemSecondaryAction>
                123
              </ListItemSecondaryAction> */}
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
            {/* <ListItem button disableGutters>
              <ListItemText primary="Application Logs" />
            </ListItem>
            <ListItem button disableGutters>
              <ListItemText primary="Market maker Logs" />
            </ListItem> */}
          </List>
          <Divider />
          <List
            disablePadding
            component="nav"
            subheader={<ListSubheader disableGutters>About</ListSubheader>}
            aria-label="secondary mailbox folders"
          >
            <ListItem button disableGutters>
              <ListItemText primary="Discord" />
              <ListItemSecondaryAction>
                https://discord.gg/nAPmwPC
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem button disableGutters>
              <ListItemText primary="MM2 version" />
              <ListItemSecondaryAction>{mm2Version}</ListItemSecondaryAction>
            </ListItem>
            <ListItem button disableGutters>
              <ListItemText primary="Build version" />
              <ListItemSecondaryAction>{version}</ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AboutTab);
