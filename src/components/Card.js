import React from "react";
import styled from "styled-components";
import axios from "axios";
import { withRouter } from "react-router-dom";
import _ from "lodash";

const Header = styled.div``;

const Image = styled.div`
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
const Url = styled.div`
  font-size: 16px;
  font-family: robto;
  color: black;
  text-align: center;
`;

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

class Cards extends React.Component {
  render() {
    return (
      <div>
        <Card>
          <form>
            <Header>
              <Image>aaaa</Image>
              <Url>
                <span>Link:</span>profileurl.......
              </Url>
            </Header>

            <Bodypart>
              <p>
                <b>Name:</b>abc
              </p>
              <p>
                <b>Email:</b>abc
              </p>
              <p>
                <b>Phone Number:</b>abc
              </p>
              <p>
                <b>Skype Id:</b>abc
              </p>
            </Bodypart>
          </form>
        </Card>
      </div>
    );
  }
}

export default Cards;
