import React, { Component } from "react";
import Card from "./Card";
import _ from "lodash";
import styled from "styled-components";

const Contaioner = styled.div`
  > div {
    display: flex;
    justify-content: space-around;
  }
`;

class Profile extends Component {
  state = {};
  render() {
    const repeat = _.times(3, (i) => {
      return (
        <Contaioner>
          <div>
            <Card />
          </div>
        </Contaioner>
      );
    });
    return <div>{repeat}</div>;
  }
}

export default Profile;
