import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./theme/index";
import { ToastContainer } from "react-toastify";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import "./style/style.css";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <App />
        <ToastContainer
          position="bottom-left"
          autoClose={4500}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
      </Router>
    </Provider>
  </ThemeProvider>
);
