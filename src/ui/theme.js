import { createTheme } from '@mui/material/styles';


// Create a theme instance.
const cookTeal = "#DAF7A6";
const cookGrey = "#36454f";
const theme = createTheme({
  palette: {
    common: {
      teal: cookTeal,
      grey: cookGrey
    },
    primary: {
      main: cookTeal,

    },
    secondary: {
      main: cookGrey,
    },

  },
  typography: {

    h1: {
      fontSize: "6em",
      fontFamily: "Bradley Hand, cursive"
    },
    h2: {
      fontSize: "6em"
    },
    mainmenu: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      color: "white",
      fontSize: "1rem"
    },

  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1199,
      ms: 1200,
      ml: 1500,
      lg: 1850,
      xl: 1900,
    },
  }
});

export default theme;
