import React, { Fragment } from "react";
import { Link } from 'react-router-dom'
import { loadProfile } from '../actions/profileActions'
import { connect } from 'react-redux'
import styled from "styled-components";
import _ from "lodash"

const Header = styled.div``;

const Img = styled.img`
  height: 130px;
  width: 100%;
  /* border-radius: 50%; */
  /* background-color: red; */
  background: transparent linear-gradient(111deg, #000033 0%, #2b2b3b 100%) 0%
    0% no-repeat padding-box;
`;

const Card = styled.div`
  height: 300px;
  width: 300px;
  border: 2px;
  :hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
`;
// const Url = styled.div`
//   font-size: 16px;
//   font-family: robto;
//   color: black;
//   text-align: center;
// `;

const Bodypart = styled.div`
  font-size: 12px;
  font-family: arial;
  margin: 10px 30px;
  > p {
    > b {
      font-size: 14px;
      font-weight: bold;
    }
  }
`;

class ShowCards extends React.Component {
  state = {
    // visible: 10,
    profile: {}

  }

  componentDidMount() {
    this.props.loadProfile()
  }

  // handleButton = () => {
  //   this.setState((prevState) => {
  //     return {
  //       visible: prevState.visible + 10
  //     }
  //   })
  // }

  render() {
    const { loadProfile, info, profile } = this.props
    // console.log(profile, 'render data')

    return (
      <Fragment>
        {profile.map(profile => (

          <Card style={{ marginRight: '5rem' }}>
            <form>
              <Header>
                <Img src={profile.imgsrc} />
                <Link>{profile.profileurl}</Link>
              </Header>
              <Bodypart>
                <p>
                  <b>Name: {profile.name}</b>
                </p>
                <p>
                  <b>Email: {profile.email}</b>
                </p>
                <p>
                  <b>Phone Number:{profile.phonenumber}</b>
                </p>
                <p>
                  <b>Scraped Time: {profile.scrapedtime}</b>
                </p>
                <p>
                  <b>Company Name: {profile.company}</b>
                </p>
                <p>
                  <b>Skype Id: {profile.skype}</b>
                </p>
              </Bodypart>
            </form>
          </Card>
        )
        )
        }
      </Fragment>
    )
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
  // console.log(dispatch, 'dispatch data')
  return {
    loadProfile: () => {
      dispatch(loadProfile());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowCards);


