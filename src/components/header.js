import React from "react";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";

/**
 * @component
 * @example
 * <Header />
 */

function Header() {
  return (
    <AppBar position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" component="div">
            Todo List
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export { Header };
