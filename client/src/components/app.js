import React from "react";
import { Route, Switch } from "react-router-dom";

//pages for app
import Home from "./home/Home";
import Login from "./login/Login";
import Register from "./register/Register";
import Profile from "./profile/Profile";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exacr path="/register" component={Register} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
