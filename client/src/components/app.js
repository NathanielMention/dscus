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
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
