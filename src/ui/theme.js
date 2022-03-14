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

  }
});

export default theme;
