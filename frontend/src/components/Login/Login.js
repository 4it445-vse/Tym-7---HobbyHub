import React, { Component } from 'react';
import api from '../../api.js';
import { FormGroup, FormControl, Navbar, Button } from 'react-bootstrap';
import {connect} from 'react-redux';

import { addLogin, loginError } from './actions.js';
import { getLoginError, hasLoginError } from './reducers.js';

export class LoginRaw extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
    Performs login verification on api.
    */
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
                this.props.loginError(error);
            });
    }

    /**
    Called on succesful login.
    */
    loginSuccess(data) {
        const {addLogin} = this.props;
        //demo data for event adding
        addLogin(data);
    }

    render() {
        const { loginError, hasLoginError } = this.props;
        const errorMsg = 'Chybně zadané heslo nebo uživatelské jméno';
        return (
            <Navbar.Form pullLeft>
                <form onSubmit={this.handleSubmit}>
                    <div id="errors">
                        { hasLoginError ? errorMsg : null}
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
                    <Button type="submit">Přihlásit</Button>
                    </div>
                </form>
            </Navbar.Form>
        );
    };
}

function mapStateToProps(state) {
    const { login } = state;
    return {
        loginError: getLoginError(login),
        hasLoginError: hasLoginError(login),
    };
}

export const Login = connect(
    mapStateToProps,
    {
        addLogin,
        loginError
    }
)(LoginRaw);
