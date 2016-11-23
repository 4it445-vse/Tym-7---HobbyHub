import React, {Component} from 'react';
import api from '../../api.js';
import { FormGroup, FormControl, Button, HelpBlock } from 'react-bootstrap';
import {connect} from 'react-redux';
import moment from 'moment';

import { registrationError, registrationSuccess } from './actions.js';
import { getRegistrationError, hasRegistrationError } from './reducer.js';

export class RegistrationFormRaw extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const registrationData = {
            created: moment().toDate(),
            last_online: moment().toDate(),
            username : formData.get('username'),
            email : formData.get('email'),
            password : formData.get('password')
        };
        api.post('appusers', registrationData)
            .then(({ data }) => this.props.registrationSuccess())
            .catch(error => {
                this.props.registrationError(error);
            });
    }

    render() {
        const { registrationErrors, hasRegistrationError } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    {[['username', 'Uživatelské jméno'], ['email', 'Email'], ['password', 'Heslo']].map(([key, label]) => {
                        var errorMsg = false;
                        if (hasRegistrationError) {
                            for (var errorKey in registrationErrors) {
                                if (!registrationErrors.hasOwnProperty(errorKey)) continue;
                                if (errorKey === key) {
                                    errorMsg = registrationErrors[errorKey];
                                }
                            }
                        }
                        return (
                            <FormGroup
                                validationState={errorMsg ? "error" : undefined}
                                key={key}
                                controlId={key}
                                >
                                {errorMsg &&
                                <HelpBlock key={key}>
                                    {errorMsg}
                                </HelpBlock>}
                                <FormControl type={key === 'password' ? "password" : "text"} name={key} placeholder={label}/>
                            </FormGroup>
                        );
                    })}
                      <div className="col-md-8">
                        <p>Registrací souhlasíte s <a href="">podmínkami služby</a>.</p>
                      </div>
                      <div className="col-md-4">
                        <Button type="submit" className="btn btn-success btn-lg">Registrovat</Button>
                      </div>
                </div>
            </form>
        );
    };
}

function mapStateToProps(state) {
    const { registration } = state;
    return {
        registrationErrors: getRegistrationError(registration),
        hasRegistrationError: hasRegistrationError(registration),
    };
}

export const RegistrationForm = connect(
    mapStateToProps,
    {
        registrationError,
        registrationSuccess
    }
)(RegistrationFormRaw);
