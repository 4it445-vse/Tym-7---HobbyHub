/**
 * Created by Honza on 12.11.2016.
 */
import React, {Component} from 'react'
import {getUserId, getAuthToken, isLoggedIn} from '../Login/reducers.js';
import {getEventState,isFetching} from '../EventList/reducers.js';
import {connect} from 'react-redux'
import {eventSignIn, eventSignOut, fetchEvent} from './actions';


export class EventSignInRaw extends Component {

  constructor(props){
    super(props)
    this.renderLoginToEventButton=this.renderLoginToEventButton.bind(this)
    this.renderLogoutToEventButton=this.renderLogoutToEventButton.bind(this)
  }

  componentDidMount() {
    const {fetchEvent, getUserId, eventId} = this.props;
    fetchEvent(getUserId, eventId)
  }

  renderLoginToEventButton(){
    const {eventId, getUserId} = this.props;
    return(
      <button className="btn btn-success" onClick={()=> {
        this.props.eventSignIn(eventId,getUserId)
      }}>Přihlásit se na událost</button>
    )
  }

  renderLogoutToEventButton(){
    const {eventId, getUserId} = this.props;
    return (
      <button className="btn btn-warning" onClick={()=>{
        this.props.eventSignOut(eventId,getUserId)
      }}>Odhlásit se z události</button>
    )
  }

  render() {
    const {isLoggedIn, isFull, eventState, isFetching} = this.props;

    console.log("isFetching",isFetching)
    return (
      <div>
        {
          isFetching===true?
            isLoggedIn === false ?
              <button className="btn btn-default" disabled="disabled">První se musíte přihlásit</button>
              :
              eventState === "accepted" ?
                this.renderLogoutToEventButton()
                : isFull ?
                <h3>Událost má již plnou kapacitu</h3>
                : eventState === "pending" ?
                <div>
                  <h3>Čekám na schválení</h3>
                  {this.renderLogoutToEventButton()}
                </div>
                : eventState === "rejected" ?
                <div>
                  <h3>Vaše žádost byla zamítnuta</h3>
                </div>
                :
                this.renderLoginToEventButton()
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
