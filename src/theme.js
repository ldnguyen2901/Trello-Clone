import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

//Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'dark', //default is light
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    text: {
      secondary: red[500],
    },
  },
});

export default theme;
