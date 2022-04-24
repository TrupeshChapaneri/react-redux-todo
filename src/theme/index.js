import { createTheme, colors } from "@material-ui/core";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#F4F6F8",
      paper: colors.common.white,
    },
    primary: {
      contrastText: "#ffffff",
      main: "#000000c4",
    },
    text: {
      primary: "#172b4d",
      secondary: "#6b778c",
    },
  },
});

export { theme };
