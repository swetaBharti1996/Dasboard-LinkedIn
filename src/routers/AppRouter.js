import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import LayoutCover from "../layout/layout";
import Insights from "../components/Insights";
import Post from "../components/Post";
import Dashboard from "../components/Dashboard";
import Comment from "../components/Comment";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Profile from "../components/Profile";
import ProffilesDetails from "../components/Profiles-Details";

export const history = createHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute exact={true} path="/" component={LoginPage} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/insights" component={Insights} />
          <PrivateRoute path="/post" component={Post} />
          <PrivateRoute path="/comment" component={Comment} />
          <PrivateRoute path="profile" component={Profile} />
          <PrivateRoute path="pofiles-details" component={ProffilesDetails} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
