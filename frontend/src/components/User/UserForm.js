import React, { Component } from 'react';

export class UserForm extends Component {


    render() {
        const {handleSubmit, username, email} = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div className="col-md-12"><b>Přezdívka</b><input name="username" type="text" className="form-control" placeholder={username}></input></div>
                <div className="col-md-6"><b>E-mail</b><input name="email" type="text" className="form-control" placeholder={email}></input></div>
                <div className="col-md-6"><b>E-mail znovu</b><input name="email_confirm" type="text" className="form-control" placeholder={email}></input></div>
                <div className="col-md-6"><b>Heslo</b><input name="password" type="password" className="form-control" placeholder="*****"></input></div>
                <div className="col-md-6"><b>Heslo znovu</b><input name="password_confirm" type="password" className="form-control" placeholder="*****"></input></div>

                <div className="col-md-12">
                    <button type="button" name="cancel" className="btn btn-danger btn-lg" required="required">Smazat profil</button>
                    <button type="submit" name="submit" className="pull-right btn btn-success btn-lg" required="required">Uložit</button>
                </div>
            </form>
        );
    };
}
