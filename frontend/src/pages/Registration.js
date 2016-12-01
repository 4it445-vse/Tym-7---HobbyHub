import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RegistrationForm} from '../components/Registration/RegistrationForm.js';
import {isRegistrationSuccess} from '../components/Registration/reducer.js';

export class RegistrationRaw extends Component {

    render() {
        const { registrationSuccessful } = this.props;
        return (
            <div className="container content-container regcover">
              <div className="col-md-3"></div>
                <div className="col-md-6">
                <div className="white-bg">
                    <h1>Registrace</h1>

                    {registrationSuccessful ? <h2>Úspěšně jste se zaregistrovali!</h2> : <RegistrationForm></RegistrationForm>}
                </div></div>
              <div className="col-md-3"></div>
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
