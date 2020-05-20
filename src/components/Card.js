import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { loadProfile } from "../actions/profileActions";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

const Header = styled.div`
  margin: 10px 10px;
  width: 300px;
`;

const Img = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background: transparent linear-gradient(111deg, #000033 0%, #2b2b3b 100%) 0%
    0% no-repeat padding-box;
`;

const Card = styled.div`
  > form {
    height: 100%;
    width: 600px;
    border: 2px;
    display: flex;
    /* justify-content: space-around; */
  }

  :hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
`;
const Url = styled.div`
  font-size: 14px;
  font-family: robto;
  color: black;
`;

// const Link = styled.div`
//   width: 50px;
// `;
const Bodypart = styled.div`
  font-size: 12px;
  font-family: arial;
  margin-top: 10px;
  width: 300px > p {
    font-size: 14px;
    font-weight: bold;
    color: transparent linear-gradient(111deg, #000033 0%, #2b2b3b 100%) 0% 0%
      no-repeat padding-box;
  }
`;

class ShowCards extends React.Component {
  state = {
    visible: 10,
    profile: {},
  };

  componentDidMount() {
    this.props.loadProfile();
  }

  handleButton = () => {
    this.setState((prevState) => {
      return {
        visible: prevState.visible + 10,
      };
    });
  };

  render() {
    const { loadProfile, info, profile } = this.props;
    console.log(profile, "render data");

    return (
      <Fragment>
        {profile.map((profile) => (
          <Card style={{ marginRight: "71rem" }}>
            <form>
              <Header>
                <Img src={profile.imgsrc} />
                <Url>
                  <Link>{profile.profileurl}</Link>
                </Url>
              </Header>
              <Bodypart>
                <p>
                  <b style={{ color: "blue" }}>Name:</b> {profile.name}
                </p>
                <p>
                  <b>Email:</b> {profile.email}
                </p>
                <p>
                  <b>Phone Number:</b>
                  {profile.phonenumber}
                </p>
                <p>
                  <b>Scraped Time: </b>
                  {profile.scrapedtime}
                </p>
                <p>
                  <b>Company Name:</b> {profile.company}
                </p>
                <p>
                  <b>Skype Id: </b>
                  {profile.skype}
                </p>
              </Bodypart>
            </form>
          </Card>
        ))}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state on card page ", state);
  return {
    profile: state.profile.info,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(dispatch, "dispatch data");
  return {
    loadProfile: () => {
      dispatch(loadProfile());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowCards);


