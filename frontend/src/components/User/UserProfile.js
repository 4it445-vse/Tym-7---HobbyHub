import React, { Component } from 'react';

export class UserProfile extends Component {


    render() {
        const {username, email} = this.props;

        return (
            <div>
                <div className="col-md-12 row">
                    <div className="col-md-6"><b>Přezdívka</b></div>
                    <div className="col-md-6"><label>{username}</label></div>
                </div>
                <div className="col-md-12 row">
                    <div className="col-md-6"><b>E-mail</b></div>
                    <div className="col-md-6"><label>{email}</label></div>
                </div>
            </div>
        );
    };
}
