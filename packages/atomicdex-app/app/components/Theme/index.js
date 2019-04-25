// https://material-ui.com/customization/themes/#themes

import { createMuiTheme } from '@material-ui/core/styles';
// import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  // https://material-ui.com/style/typography/#strategies
  typography: {
    useNextVariants: true
  },

  palette: {
    type: 'light',
    primary: {
      // This is a main color for button
      main: '#2196f3'
    }
  },

  drawer: {
    background: '#F6F6F6',
    color: 'rgba(0, 0, 0, .87)'
  },

  appbar: {
    background: '#fff'
  },

  colors: {
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8'
  }
});

export default theme;
