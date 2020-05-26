import React, { Component } from "react";
import ShowCards from "./Card";
import styled from "styled-components";
import { Pagination } from "antd";
import { loadProfile } from "../actions/profileActions";
import { connect } from "react-redux";
import queryString from "query-string";

const Contaioner = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

class Profile extends Component {
  state = {
  };
  componentDidMount() {
    let data = {};
    data.pageNo = 1;
    data.size = 10;
    let query = queryString.stringify(data);
    this.props.loadProfile(query);
  }

  handlePgination = (pageNo, size) => {
    let data = {};
    data.pageNo = pageNo;
    data.size = 10;
    let query = queryString.stringify(data);
    this.props.loadProfile(query);
  };

  componentDidMount() {
    let data = {};
    data.pageNo = 1;
    data.size = 10;
    let query = queryString.stringify(data);
    this.props.loadProfile(query);
  }

  handlePgination = (pageNo, size) => {
    let data = {};
    data.pageNo = pageNo;
    data.size = 10;
    let query = queryString.stringify(data);
    this.props.loadProfile(query);
  };

  render() {
    const today = this.state.currentDate;

    const { profile } = this.props;
    return (
      <Contaioner>
        <div>
          {profile.map((item, index) => (
            <ShowCards profile={item} />
          ))}

          <Pagination
            style={{ marginLeft: "60%", marginTop: "5%" }}
            total={50}
            current={this.state.page}
            defaultCurrent={1}
            onChange={(pageNo, size) => this.handlePgination(pageNo, size)}
          />
        </div>
      </Contaioner>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("state on card page ", state);
  return {
    profile: state.profile.info,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // console.log(dispatch, "dispatch data");
  return {
    loadProfile: (data) => {
      dispatch(loadProfile(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
