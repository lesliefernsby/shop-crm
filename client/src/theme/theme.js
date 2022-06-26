/* eslint-disable import/prefer-default-export */

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#ffcc00",
      light: "#FFD633",
      dark: "#B28E00",
      contrastText: "#000",
    },
    secondary: {
      main: "#f50057",
      light: "#F73378",
      dark: "#AB003C",
      contrastText: "#fff",
    },
    error: {
      main: "#F44336",
      light: "#E57373",
      dark: "#D32F2F",
      contrastText: "#fff",
    },
    success: {
      main: "#5dd662",
      light: "#7DDE81",
      dark: "#419544",
      contrastText: "#000",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: ["-apple-system", "Montserrat", "Roboto", "Arial"].join(","),
  },
});
