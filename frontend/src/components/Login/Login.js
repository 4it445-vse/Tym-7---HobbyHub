import React, { Component } from 'react';
import api from '../../api.js';
import { FormGroup, FormControl, Navbar, Button } from 'react-bootstrap';
import {connect} from 'react-redux';

import {addLogin} from '../Login/actions.js';

export class LoginRaw extends Component {
    constructor(props) {
        super(props);
        this.state = {loginError: false};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const loginData = {
            email : formData.get('email'),
            password : formData.get('password')
        };
        api.post('appusers/login', loginData)
            .then(({ data }) => this.loginSuccess(data))
            .catch(error => {
                this.loginFail(error);
            });
    }

    loginSuccess(data) {
        console.log('login ok');
        const {addLogin} = this.props;
        //demo data for event adding
        addLogin(data);
        if (this._mounted) {
            this.setState({loginError: false});
        }
    }

    loginFail(data) {
        //TODO remove when handled
        console.log(data);
        if (this._mounted) {
            this.setState({loginError: false});
        }
    }


    render() {
        const {addLogin} = this.props;
        const {loginError} = this.state;
        const errorMsg = 'Chybnì zadané heslo nebo uživatelské jméno';
        return (
            <Navbar.Form pullLeft>
                <form onSubmit={this.handleSubmit}>
                    <div id="errors">
                        { loginError ? errorMsg : null}
                    </div>
                    <div>
                    {[['email', 'Email'], ['password', 'Heslo']].map(([key, label]) => {
                        return (
                            <FormGroup
                                key={key}
                                controlId={key}
                                >
                                <FormControl type={key === 'password' ? "password" : "text"} name={key} placeholder={label}/>
                            </FormGroup>
                        );
                    })}
                    {' '}
                    <Button type="submit">Pøihlásit</Button>
                    </div>
                </form>
            </Navbar.Form>
        );
    };
}

function mapStateToProps(state) {
    const { login } = state;
    return {
        login
    };
}

export const Login = connect(
    mapStateToProps,
    {
        addLogin
    }
)(LoginRaw);
