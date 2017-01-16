import React, { Component } from 'react';

export class UserForm extends Component {


    render() {
        const {handleSubmit, username, email, formErrors} = this.props;
        const {formSuccess, usernameError, formError, emailError, pwError, } = formErrors;
        return (
            <form onSubmit={handleSubmit}>
                {formSuccess && <div className="col-md-12 has-success"><label className="control-label">{formSuccess}</label></div>}
                {formError && <div className="col-md-12 has-error"><label className="control-label">{formError}</label></div>}
                <div className={usernameError ? "col-md-12 has-error" : "col-md-12"}>
                    <b>Přezdívka</b>
                    <input id="username" name="username" type="text" className="form-control" placeholder={username}></input>
                    {usernameError && <div className="col-md-12 has-error"><label className="control-label">{usernameError}</label></div>}
                </div>
                <div className={emailError ? "col-md-14 has-error" : "col-md-14"}>
                    <div className="col-md-6"><b>E-mail</b><input id="email" name="email" type="text" className="form-control" placeholder={email}></input></div>
                    <div className="col-md-6"><b>E-mail znovu</b><input name="email_confirm" type="text" className="form-control" placeholder={email}></input></div>
                    {emailError &&<div className="col-md-12"><label className="control-label" htmlFor="email">{emailError}</label></div>}
                </div>
                <div className={pwError ? "col-md-14 has-error" : "col-md-14"}>
                    <div className="col-md-6"><b>Heslo</b><input id="password" name="password" type="password" className="form-control" placeholder="*****"></input></div>
                    <div className="col-md-6"><b>Heslo znovu</b><input name="password_confirm" type="password" className="form-control" placeholder="*****"></input></div>
                    {pwError && <div className="col-md-12"><label className="control-label" htmlFor="password">{pwError}</label></div>}
                </div>
                <div className="col-md-12 top-buffer">
                    <button type="submit" name="submit" className="pull-right btn btn-success btn-lg" required="required">Uložit</button>
                </div>
            </form>
        );
    };
}
