import React, { useState } from 'react';
import { Form, Input, Checkbox, Row, Col, Alert, Modal, Radio, Spin } from 'antd';
import styled from 'styled-components';
import { FcGoogle, FcOk } from "react-icons/fc";
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';


const MainGrid = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 10% 40% 40% 10%;
  grid-template-rows: 15% 70% 15%;
  font-family: 'Poppins', sans-serif;

`;

const LoginInfo = styled.div`
  display: flex;
    justify-content: center;
    align-items: center;
    ul{
      height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    }

  ul li{
    list-style:none;
    font-family: 'Poppins', sans-serif;
  }
`;

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    padding-left: 4rem;

    p{
      font-weight:700;
    } 
`;

const AppLogo = styled.div`
  width:auto;
`;

const ErrorMessage = styled.div`
    width: 70%;
    padding: 0.5rem 0;
    background-color: #ffdbdb;
    border: 1px solid #ff7373;
    text-align: center;
    font-size: 14px;
    border-radius: 7px;
    color: #960000;
`;

const Button = styled.button`
  width: 70%;
    padding: 0.7rem 0;
    color: black;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover{
      box-shadow: 0 1px 3px #ccc;
      cursor: pointer;
    }
`;

const FormItem = styled.div`
     width: 70%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    >label{
      font-weight: 500;
      text-align:left;
    }
`;

const FormInput = styled.input`
    border: 1px solid #aaa;
    padding: 0.5rem 1.6rem;
    border-radius: 6px;
    transition: 0.2s ease-in; 

    &:focus{
      border: 1px solid #444;
      outline: none;
    }
    
`;

const LoginButton = styled(Button)`
    background-color: ${props => !props.loading ? '#1890ff' : 'rgba(24, 144, 255, 0.3)'};
    color: white;

    &:active, &:focus{
      outline:none;
    }
`;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class LoginPage extends React.Component {


  state = {
    email: null,
    password: null,
    message: null,
    visible: false,
    loading: false,
    errorMessage: ''
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }


  componentDidUpdate(prevProps) {
    const { error, isLoading } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_ERROR') {
        this.setState({ errorMessage: error.message })
      } else {
        this.setState({ errorMessage: null })
      }
    }

    if (isLoading !== prevProps.isLoading) {
      this.setState({ loading: isLoading })
    }
  }



  handleLoginClick = () => {


    const { email, password, loading } = this.state;

    if (!email || !password) {
      this.setState({ errorMessage: "Please input all the fields" })
    } else {
      const user = {
        email,
        password
      }
      this.props.login(user);
      this.props.history.push("/insight")
    }
  }

  render() {
    const { errorMessage, email, password, loading } = this.state;
    return (
      <>
        <MainGrid>
          <div className="bg"></div>
          <div className="bg"></div>
          <div></div>
          <div></div>
          <div className="bg"></div>
          <LoginInfo className="bg">
            <AppLogo />
            <ul>
              <li><FcOk style={{ marginRight: '5px' }} />Get business prospects and email addresses</li>
              <li><FcOk style={{ marginRight: '5px' }} />Verify emails individually and in bulk</li>
              <li><FcOk style={{ marginRight: '5px' }} />Send emails for free</li>
              <li><FcOk style={{ marginRight: '5px' }} />Design drip campaigns visually</li>
              <li><FcOk style={{ marginRight: '5px' }} />Identify technologies on websites</li>
            </ul>
          </LoginInfo>
          <LoginForm>
            <h1>Log In to your account</h1>
            <Button><FcGoogle style={{ fontSize: '20px', margin: '0px 20px 0px 0px' }} />Login with Google</Button>
            <p>OR</p>
            {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
            <FormItem>
              <label>Email Address</label>
              <FormInput type="email" placeholder="Enter your email" onChange={(e) => this.setState({ email: e.target.value })} />
            </FormItem>
            <FormItem>
              <label>Password</label>
              <FormInput type="password" placeholder="Enter password" onChange={(e) => this.setState({ password: e.target.value })} />
            </FormItem>

            <LoginButton loading={loading} onClick={this.handleLoginClick}><Spin indicator={antIcon} spinning={loading} style={{ color: '#1890ff', background: 'none' }} >Login</Spin></LoginButton>
          </LoginForm>
          <div></div>
          <div className="bg"></div>
          <div className="bg"></div>
          <div></div>
          <div></div>
        </MainGrid>
      </>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.auth.token,
    error: state.error,
    isLoading: state.auth.isLoading
  }
}

export default connect(mapStateToProps, { login, clearErrors })(LoginPage);


