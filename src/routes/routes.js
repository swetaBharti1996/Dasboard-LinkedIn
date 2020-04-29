import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/Login';
import LayoutCover from '../layout/layout';
import Insight from '../components/Insights';
import Comment from '../components/Comment';
import { connect } from 'react-redux'
export const history = createHistory();

const AppRouter = (props) => {
    return (
        <Router history={history}>
            <div>
                <Switch>
                    {props.auth.isAuthenticated && props.auth.user._id ? <Route path="/" render={() => <LayoutCover><Route exact={true} path="/comment" component={Comment} /><Route exact={true} path="/insight" component={Insight} /></LayoutCover>} /> :
                        <>
                            <Route exact={true} path="/" component={LoginPage} />
                        </>
                    }
                </Switch>
            </div>
        </Router>
    );
}
const mapStateToProps = ({ auth }) => ({ auth })
export default connect(mapStateToProps)(AppRouter);