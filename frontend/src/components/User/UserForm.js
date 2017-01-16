import React, { Component } from 'react';
import Select2 from 'react-select';
import 'react-select/dist/react-select.css';
import api from '../../api.js';

export class UserForm extends Component {

    constructor(props) {
      super(props);

      this.state = {
        prefered_tags: props.prefered_tags,
        tag_options: []
      }

    }

    fetchTags() {
      api('tags')
        .then((response) => {
          return response.data.map(function(tag) {
            return {value: tag.name, label: tag.name};
          })
      }).then((tagArray) => {
        const newState = {
          ...this.state
        }
        newState.tag_options=tagArray;
        this.setState(newState);
      });
    }

    componentDidMount() {
      this.fetchTags();
    }

    render() {
        const {handleSubmit, username, email, prefered_tags, handleSelectTagChange} = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div className="col-md-12"><b>Přezdívka</b><input name="username" type="text" className="form-control" placeholder={username}></input></div>
                <div className="col-md-6"><b>E-mail</b><input name="email" type="text" className="form-control" placeholder={email}></input></div>
                <div className="col-md-6"><b>E-mail znovu</b><input name="email_confirm" type="text" className="form-control" placeholder={email}></input></div>
                <div className="col-md-6"><b>Heslo</b><input name="password" type="password" className="form-control" placeholder="*****"></input></div>
                <div className="col-md-6"><b>Heslo znovu</b><input name="password_confirm" type="password" className="form-control" placeholder="*****"></input></div>
                <div className="col-md-6">
                <b>Preferované kategorie</b>
                  <Select2
                    multi
                    simpleValue
                    placeholder="Vyberte kategorie"
                    id="tags"
                    name="tags"
                    value={prefered_tags}
                    options={this.state.tag_options}
                    joinValues
                    onChange={handleSelectTagChange}
                  ></Select2>
                </div>
                <div className="col-md-12 top-buffer">
                    <button type="button" name="cancel" className="btn btn-danger btn-lg" required="required">Smazat profil</button>
                    <button type="submit" name="submit" className="pull-right btn btn-success btn-lg" required="required">Uložit</button>
                </div>
            </form>
        );
    };
}
