import React from "react";
import { Route, Switch } from "react-router-dom";

//pages for app
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./register/Register";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
