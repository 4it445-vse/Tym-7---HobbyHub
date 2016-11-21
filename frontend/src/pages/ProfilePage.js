/**
 * Created by Honza on 22.10.2016.
 */
/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';

export class ProfilePage extends Component {
  render() {
    return (

      <div className="container content-container">
        <div>
          <div className="col-md-4">
          <a className="btn btn-default" href="/">Zpět na výpis</a>

          </div>

          <div className="col-md-8">
            <h1 className="pull-left">Profil</h1>
          </div>
          <div className="row"></div>

          <div className="col-md-4">

                <img className="col-md-12" src={'/' + process.env.PUBLIC_URL + 'images/tenis.jpg'} alt="{name}"/>


          </div>

          <div className="col-md-8">
            <div className="col-md-12">
              <div className="col-md-12"><b>Přezdívka</b><input type="text" className="form-control" value="Ferda"></input></div>
              <div className="col-md-6"><b>E-mail</b><input type="text" className="form-control" value="ferda@seznam.cz"></input></div>
              <div className="col-md-6"><b>E-mail znovu</b><input type="text" className="form-control" value=""></input></div>
              <div className="col-md-6"><b>Heslo</b><input type="text" className="form-control" value=""></input></div>
              <div className="col-md-6"><b>Heslo znovu</b><input type="text" className="form-control" value=""></input></div>

              <div className="col-md-6">
                  <button type="button" name="cancel" className="btn btn-danger btn-lg" required="required">Smazat profil</button>
              </div>
              <div className="col-md-6">
                  <button type="submit" name="submit" className="pull-right btn btn-success btn-lg" required="required">Uložit</button>
              </div>



            </div>
          </div>


        </div>
      </div>
    );
  }
}
