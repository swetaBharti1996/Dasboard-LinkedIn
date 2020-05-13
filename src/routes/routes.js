import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import LoginPage from "../components/Login";
import LayoutCover from "../layout/layout";
import Insight from "../components/Insights";
import CommentData from "../components/Comment";
import PostData from "../components/Post"
import Profile from "../components/Profile";
import { connect } from "react-redux";
import ProfileDetail from "../components/ProfileDetail";
export const history = createHistory();

const AppRouter = (props) => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          {props.auth.isAuthenticated && props.auth.user._id ? (
            <Route
              path="/"
              render={() => (
                <LayoutCover>
                  <Route exact={true} path="/post" component={CommentData} />
                  <Route exact={true} path="/insight" component={Insight} />
                  <Route exact={true} path="/comment" component={PostData} />
                  <Route exact={true} path="/profile" component={Profile} />
                  <Route
                    exact={true}
                    path="/profileDetail"
                    component={ProfileDetail}
                  />
                </LayoutCover>
              )}
            />
          ) : (
              <>
                <Route exact={true} path="/" component={LoginPage} />
              </>
            )}
        </Switch>
      </div>
    </Router>
  );
};
const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps)(AppRouter);
