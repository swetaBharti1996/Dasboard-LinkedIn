import React from 'react';
import { Form, Input, Button, Alert, Modal } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';

import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';


const CollectionCreateForm = ({ visible, onCreate, onCancel, success, message }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Login using email"
            okText="Login"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        onCreate(values);
                        form.resetFields();
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                {message ? success(message) : null}
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Enter your email address',
                            type: 'email'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    );
};
class LoginPage extends React.Component {

    state = {
        email: null,
        password: null,
        message: null,
        visible: false
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'LOGIN_ERROR') {
                this.setState({ message: error.message })
            } else {
                this.setState({ message: null })
            }
        }

    }

    success = (text) => {
        return <Alert message={text} type="error" />
    };

    onCreate = values => {
        console.log('Received values of form: ', values);

        const { email, password } = values;

        const user = {
            email,
            password
        }

        this.props.login(user);
        this.props.clearErrors();
    };

    render() {
        return (
            <div className="wrapper">
                <Button
                    type="primary"
                    onClick={() => {
                        this.setState({ visible: true });
                    }}
                >
                    Login via Email
             </Button>
                <CollectionCreateForm
                    visible={this.state.visible}
                    onCreate={this.onCreate}
                    onCancel={() => {
                        this.props.clearErrors();
                        this.setState({ visible: false });
                    }}
                    success={this.success}
                    message={this.state.message}
                />
            </div>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.token,
        error: state.error
    }
}

export default connect(mapStateToProps, { login, clearErrors })(LoginPage);


