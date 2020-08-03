import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//components
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
