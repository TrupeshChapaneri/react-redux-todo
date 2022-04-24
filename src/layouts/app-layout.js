import React from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import { Header } from "components/header";

function AppLayout({ children }) {
  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="lg" className="container-main">
        {children}
      </Container>
    </React.Fragment>
  );
}

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export { AppLayout };
