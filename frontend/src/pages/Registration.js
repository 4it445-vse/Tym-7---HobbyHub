import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RegistrationForm} from '../components/Registration/RegistrationForm.js';
import {isRegistrationSuccess} from '../components/Registration/reducer.js';

export class RegistrationRaw extends Component {

    render() {
        const { registrationSuccessful } = this.props;
        return (
            <div className="container content-container">
              <div className="col-md-2"></div>
                <div className="col-md-3">
                    <h1>Registrace</h1>
                </div>
                <div className="col-md-5">
                    {registrationSuccessful ? <h2>Úspěšně jste se zaregistrovali!</h2> : <RegistrationForm></RegistrationForm>}
                </div>
              <div className="col-md-2"></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registration } = state;
    return {
        registrationSuccessful: isRegistrationSuccess(registration)
    };
}

export const Registration = connect(
    mapStateToProps,
    {}
)(RegistrationRaw);
