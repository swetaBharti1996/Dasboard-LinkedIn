import React, { Component } from "react";
import ShowCards from "./Card";
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


        return (
            <Contaioner>
                <div>
                    <ShowCards />
                </div>
            </Contaioner>
        );

    }
}

export default Profile

