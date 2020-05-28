import React, { Component } from "react";;
import { withRouter } from "react-router-dom";
import LayoutCover from "../layout/layout";

const PATH = {
    LOGIN: "/",
    DASHBOARD: "/dashboard",
    BASE: "/",
    TABLE: "/group/list"
};

export default ComposedComponent => {
    class RequireAuth extends Component {
        componentDidMount = () => {
            this.verify();
        };

        verify = () => {
            const { isAuthenticated, user, token, location, history } = this.props;

            console.log("propsesa", this.props);

            if (isAuthenticated) {

            } else {

            }
        };

        render() {
            return (
                <Layout>
                    <ComposedComponent {...this.props} />
                </Layout>
            );
        }
    }

    const mapStateToProps = state => {
        return {
            auth: state.auth
        };
    };

    // const mapDispatchToProps = dispatch => {
    //  return { authRefresh: data => dispatch(authRefresh(data)) };
    // };

    return connect(
        mapStateToProps
    )(withRouter(RequireAuth));
};
