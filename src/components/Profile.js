import React, { Component } from "react";
import ShowCards from "./Card";
// import _ from "lodash";
import styled from "styled-components";
import { Pagination } from "antd";
import { loadProfile, deleteProfile } from "../actions/profileActions";
import { connect } from "react-redux";
import queryString from "query-string";

const Contaioner = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
`;
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

class Profile extends Component {
  state = {};

  componentDidMount() {
    let data = {};
    data.pageNo = 1;
    data.size = 10;
    let query = queryString.stringify(data);
    this.props.loadProfile(query);
    deleteProfile()
  }

  handlePgination = (pageNo, size) => {
    let data = {};
    data.pageNo = pageNo;
    data.size = 10;
    let query = queryString.stringify(data);
    this.props.loadProfile(query);
  };

  render() {
    const { profile } = this.props;
    return (
      <Contaioner>
        <div>
          {profile.map((item, index) => (
            <ShowCards profile={item} />

          ))}

          <Pagination
            style={{ marginLeft: "60%", marginTop: "5%" }}
            total={profile && profile.length}
            current={this.state.page}
            defaultCurrent={1}
            onChange={(pageNo, size) => this.handlePgination(pageNo, size)}
          />
        </div>
      </Contaioner>
    );
  }
}

const mapStateToProps = ({ profile, error }) => {
  // console.log("state on card page ", state);
  return {
    profile: profile.info,
    error
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // console.log(dispatch, "dispatch data");
  return {
    loadProfile: () => {
      dispatch(loadProfile());
    },
    deleteProfile: (profileurl) => {
      dispatch(deleteProfile(profileurl))
    }


  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
