import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ba68c8", 
      main: "#9c27b0", 
      dark: "#7b1fa2", 
    },
    secondary: {
        light: "#42a5f5", 
        main: "#1976d2", 
        dark: "#1565c0", 
    },
    text: {
        primary: "#212121",
        secondary: "#757575",
    }
  },
  typography: {
    fontFamily: "Fredoka, sans-serif",
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
