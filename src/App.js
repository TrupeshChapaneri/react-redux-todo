import { TodoDetails } from "components/todo-details";
import { AppLayout } from "layouts/app-layout";
import { TodoList } from "pages/todo-list";
import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/todo">
          <AppLayout>
            <TodoList />
          </AppLayout>
        </Route>
        <Route path="/todo/:id">
          <AppLayout>
            <TodoDetails />
          </AppLayout>
        </Route>

        <Redirect to="/todo" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
