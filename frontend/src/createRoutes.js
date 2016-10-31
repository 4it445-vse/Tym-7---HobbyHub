/**
 * Created by Honza on 22.10.2016.
 */
import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {AppPage} from "./pages/AppPage"
import {HomePage} from "./pages/HomePage"
import {EventDetailPage} from "./pages/EventDetailPage"
import {ProfilePage} from "./pages/ProfilePage"
import {EventPage} from "./pages/EventPage"

export function createRoutes() {
  return (
    <Route path="/" component={AppPage}>
      <IndexRoute component={HomePage}/>
      <Route path="profile">
        <IndexRoute component={ProfilePage}/>
      </Route>
      <Route path="events">
        <IndexRoute component={EventPage}/>
        <Route path=":eventId">
          <IndexRoute component={EventDetailPage}/>
        </Route>
      </Route>
    </Route>
  )
};