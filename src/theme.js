// import { createTheme } from '@mui/material';
// import { red } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
// import { teal, deepOrange, cyan, orange } from '@mui/material/colors';

const APP_BAR_HEIGHT = '58px';
const BOARD_BAR_HEIGHT = '60px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTER_HEIGHT = '56px';

//Create a theme instance
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
  },
  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: teal,
    //     secondary: deepOrange,
    //   },
    // },
    // dark: {
    //   palette: {
    //     primary: cyan,
    //     secondary: orange,
    //   },
    // },
  },
  // ...other properties
  components: {
    // Name of the component
    MuiCssBaselineName: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px',
            m: 2,
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white',
            borderRadius: '8px',
            m: 2,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover': { borderWidth: '0.5px' },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          '&.MuiTypography-body1': { fontSize: '0.875rem' },
        },
      },
    },

    // MuiCardContent: {
    //   styleOverrides: {
    //     root: {
    //       // color: theme.palette.primary.main,
    //       fontSize: '0.875rem',
    //     },
    //   },
    // },

    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: {
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.light,
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.main,
          //   },
          // },
          '& fieldset': {
            borderWidth: '0.5px !important',
          },
          '&:hover fieldset': {
            borderWidth: '1px !important',
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1px !important',
          },
        },
      },
    },
  },
});

export default theme;
