/**
 * Created by Honza on 12.11.2016.
 */
import React, {Component} from 'react'
import {getUserId, getAuthToken, isLoggedIn} from '../Login/reducers.js';
import {getEventState,isFetching} from '../EventList/reducers.js';
import {connect} from 'react-redux'
import {eventSignIn, eventSignOut, fetchEvent} from './actions';


export class EventSignInRaw extends Component {


  componentDidMount() {
    const {fetchEvent, getUserId, eventId} = this.props;
    fetchEvent(getUserId, eventId)
  }

  render() {
    const {eventId, getUserId, isLoggedIn, isFull, eventState, isFetching} = this.props;

    console.log("isFetching",isFetching)
    return (
      <div>
        {
          isFetching===true?
            isLoggedIn === false ?
              <button className="btn btn-default" disabled="disabled">První se musíte přihlásit</button>
              :
              eventState === "accepted" ?
                <button className="btn btn-warning" onClick={()=>{
                this.props.eventSignOut(eventId,getUserId)
              }}>Odhlásit se z události</button>
                : isFull ?
                <button className="btn btn-default" disabled="disabled">Událost má již plnou kapacitu</button>
                : eventState === "pending" ?
                <div>
                  <button className="btn btn-default" disabled="disabled">Čekám na schválení</button>
                </div>
                : eventState === "rejected" ?
                <div>
                  <button className="btn btn-default" disabled="disabled">Vaše žádost byla zamítnuta</button>
                </div>
                :
                <button className="btn btn-success" onClick={()=> {
                this.props.eventSignIn(eventId,getUserId)
              }}>Přihlásit se na událost</button>
            :
            'Ověřování stavu'
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {login, eventUser} = state;
  return {
    getUserId: getUserId(login),
    getAuthToken: getAuthToken(login),
    isLoggedIn: isLoggedIn(login),
    eventState: getEventState(eventUser),
    isFetching: isFetching(eventUser)
  };
}

export const EventSignIn = connect(
  mapStateToProps,
  {
    eventSignIn,
    eventSignOut,
    fetchEvent,
  }
)(EventSignInRaw);
