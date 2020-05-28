import React, { Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";
import linkedin from "../images/linkedin.png";

const Header = styled.div`
  margin: 10px 10px;
  width: 280px;
`;

const Img = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background: transparent linear-gradient(111deg, #000033 0%, #2b2b3b 100%) 0%
    0% no-repeat padding-box;
`;

const Card = styled.div`
  border: 0.2px solid #1890ff;
  margin-top: 20px;
  > form {
    height: 100%;
    width: 500px;
    display: flex;
  }
  :hover {
    box-shadow: 0 4px 8px 0 rgba(0, 1, 1, 0.2);
  }
`;
const Url = styled.div`
  margin-left: 10px;
  > a {
    > img {
      height: 40px;
      width: 40px;
    }
  }
`;

const Bodypart = styled.div`
  font-size: 12px;
  font-family: arial;
  margin-top: 10px;
  width: 320px;
  > p {
    font-size: 12px;
    font-weight: bold;
    color: transparent linear-gradient(111deg, #000033 0%, #2b2b3b 100%) 0% 0%
      no-repeat padding-box;
  }
`;

const Delete = styled.button`
  background: transparent linear-gradient(111deg, #000033 0%, #1890ff 100%) 0%
    0% no-repeat padding-box;
  border: navajowhite;

  font-weight: bolder;
  text-align: center;
  width: 500px;
  margin-top: 20px;
  font-family: "Karla", sans-serif;
  letter-spacing: 0;
  color: #ffffff;
  opacity: 1;
`;

class ShowCards extends React.Component {
  state = {
    profile: {},
  };

  render() {
    const { profile } = this.props;
    console.log("timeeeeeeeeeeeeee", profile.scrapedtime);
    return (
      <Fragment>
        <Card style={{ marginRight: "52rem" }}>
          <form>
            <Header>
              <Img src={profile.imgsrc} />
              <Url>
                <a href={profile.profileurl}>
                  <img src={linkedin} alt="fairpe" />
                </a>
              </Url>
            </Header>
            <Bodypart>
              <p>
                <b style={{ color: "#1890ff" }}>Name:</b>
                {profile.name}
              </p>
              <p>
                <b style={{ color: "#1890ff" }}>Email:</b> {profile.email}
              </p>
              <p>
                <b style={{ color: "#1890ff" }}>Phone Number:</b>
                {profile.phonenumber}
              </p>
              <p>
                <b style={{ color: "#1890ff" }}>Scraped Time: </b>
                {new Date(profile.scrapedtime * 1000).toString().slice(3, 15)},
                {new Date(profile.scrapedtime * 1000)
                  .toLocaleTimeString()
                  .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
              </p>
              <p>
                <b style={{ color: "#1890ff" }}>Company Name:</b>
                {profile.company}
              </p>
              <p>
                <b style={{ color: "#1890ff" }}>Skype Id: </b>
                {profile.skype}
              </p>
            </Bodypart>
          </form>
          <Delete>DELETE</Delete>
        </Card>
      </Fragment>
    );
  }
}

export default ShowCards;