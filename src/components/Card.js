import React, { Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import _ from "lodash";
import linkedin from "../images/linkedin.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from 'antd';
import {
  faTrashAlt,
  faEnvelope,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { DeleteTwoTone, PhoneTwoTone, FireTwoTone } from '@ant-design/icons';

const { Paragraph } = Typography;

const Header = styled.div`
  margin: 10px 10px;
  width: 210px;
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
    width: 100%;
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
  width: 340px;
  > p {
    font-size: 12px;
    font-weight: bold;
    color: transparent linear-gradient(111deg, #000033 0%, #2b2b3b 100%) 0% 0%
      no-repeat padding-box;
    line-height: 20px;
  }
`;

const Button = styled.button`
  background: transparent linear-gradient(111deg, #000033 0%, #1890ff 100%) 0%
    0% no-repeat padding-box;
  border: navajowhite;
  font-weight: bolder;
  text-align: center;
  width: 180px;
  margin-top: 5%;
  font-family: "Karla", sans-serif;
  letter-spacing: 0;
  color: #ffffff;
  opacity: 1;
  /* margin: 1em; */
  padding: 0.25em 1em;
  border-radius: 3px;
`;

const Span = styled.div`
  color: white;
  background-color: #0066ff;
  text-align: center;
  width: 100px;
  font-size: 10px;
  margin-right: 10px;
`;

const SpanPersonal = styled.div`
  color: white;
  background-color: #33cc33;
  text-align: center;
  width: 100px;
  font-size: 10px;
  margin-right: 10px;
  margin-top: 2px;
`;

const MailConatiner = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Box = styled.div`
  display: flex;
  /* justify-content: space-between; */
`;

const Detail = styled.div`
  font-family: arial;
`;

const Name = styled.div`
  font-family: arial;
  font-size: 20px;
  color: #1890ff;
  margin-top: 5%;
`;

const SendEmail = styled.div`
  margin-right: 10px;
  font-size: 20px;
`;

const Company = styled.div`
  margin: 10px 10px;
  width: 300px;
`;

class ShowCards extends React.Component {
  state = {
    profile: {},
    // experience:[]
  };

  handleDelete = (e, profileurl) => {
    this.props.deleteProfile(profileurl);
    e.preventDefault();
  };

  render() {
    const { profile, deleteProfile, experience } = this.props;
    console.log("emailllllll", profile);
    console.log("profil experianceeeeeeeeeeeeeeeeeeeeeeee", profile.experience);

    return (
      <div style={{ width: "1100px" }}>
        <Card style={{}}>
          <form>
            <Header>
              <Img src={profile.imgsrc} />
              <Url>
                <a href={profile.profileurl}>
                  <img src={linkedin} alt="fairpe" />
                </a>
              </Url>
              <Name>{profile.name}</Name>
              <Detail>
                <h5>
                  <b> {profile.breakwords}</b>
                </h5>
                <h5> {profile.connectedon}</h5>
                <h5> {profile.currentplace}</h5>
              </Detail>
            </Header>
            <Bodypart>
              <p>
                <b style={{ color: "#1890ff" }}>Email</b>
                <MailConatiner>
                  <Paragraph copyable>{profile.personalemail}</Paragraph>
                  <Box>
                    {/* <SpanPersonal>personal email</SpanPersonal> */}
                    <SendEmail>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{ color: " #33cc33" }}
                      />
                    </SendEmail>
                  </Box>
                </MailConatiner>
                <MailConatiner>
                  <Paragraph copyable>{profile.officeemail}</Paragraph>
                  <Box>
                    {/* <Span>official email</Span> */}
                    <SendEmail>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{ color: "#0066ff" }}
                      />
                    </SendEmail>
                  </Box>
                </MailConatiner>
              </p>
              <p>
                <b style={{ color: "#1890ff" }}>Phone Number</b>

                <MailConatiner>
                  <Paragraph copyable>{profile.personalphonenumber}</Paragraph>
                  <SendEmail>
                    <PhoneTwoTone />
                  </SendEmail>
                  {/* <li>{profile.personalphonenumber}</li> */}
                  {/* <SpanPersonal>personal phone</SpanPersonal> */}
                </MailConatiner>
                <MailConatiner>
                  <Paragraph copyable>{profile.officephonenumber}</Paragraph>
                  <SendEmail>
                    <PhoneTwoTone />
                  </SendEmail>
                  {/* <li>{profile.officephonenumber}</li> */}
                  {/* <Span>official phone </Span> */}
                </MailConatiner>
              </p>
              <p>
                <b style={{ color: "#1890ff" }}>Scraped Time: </b>
                {new Date(profile.scrapedtime * 1000).toString().slice(3, 15)},
                {new Date(profile.scrapedtime * 1000)
                  .toLocaleTimeString()
                  .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}
              </p>
              <p>
                <b style={{ color: "#1890ff" }}>Skype Id: </b>
                {profile.skype}
              </p>
              <p>
                <b style={{ color: "#1890ff" }}>twitter: </b>
                {profile.twitter}
              </p>
            </Bodypart>
            <Company>
              <b style={{ color: "#1890ff" }}>Education</b>
              <MailConatiner>
                {console.log("collegename")}
                {console.log(profile)}
                <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                  {profile.education != null ? profile.education.map(edu => <p style={{ fontFamily: "sans-serif" }}><FireTwoTone />{` ${edu.collegename} | ${edu.date} | ${edu.course}`}</p>) : null}
                </div>
              </MailConatiner>
            </Company>
            <Company>
              <b style={{ color: "#1890ff" }}>Experience</b>
              <MailConatiner>
                {console.log("collegename")}
                {console.log(profile)}
                <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                  {profile.experience != null ? profile.experience.map(exp => <p style={{ fontFamily: "sans-serif" }}><FireTwoTone />{` ${exp.companyname} | ${exp.date} | ${exp.position}`}</p>) : null}
                </div>
              </MailConatiner>
            </Company>
            <DeleteTwoTone onClick={(e) => this.handleDelete(e, profile.profileurl)} style={{ marginTop: "5px", marginRight: "5px", fontSize: "25px" }} />
          </form>
        </Card>
      </div>
    );
  }
}

export default ShowCards;