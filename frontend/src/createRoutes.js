/**
 * Created by Honza on 22.10.2016.
 */
import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {AppPage} from "./pages/AppPage"
import {HomePage} from "./pages/HomePage"
import {EventDetailPage} from "./pages/Events/EventDetailPage"
import {EventEditPage} from "./pages/Events/EventEditPage"
import {ProfilePage} from "./pages/ProfilePage"
import {EventPage} from "./pages/Events/EventPage"
import {EventAddPage} from "./pages/Events/EventAddPage"
import {GenericNotFoundPage} from "./pages/GenericNotFoundPage"
import {Registration} from "./pages/Registration.js"

export function createRoutes() {
  return (
    <Route path="/" component={AppPage}>
      <IndexRoute component={HomePage}/>
      <Route path="profile">
        <IndexRoute component={ProfilePage}/>
        <Route path=":profileId">
          <IndexRoute component={ProfilePage}/>
        </Route>
      </Route>
      <Route path="registration">
        <IndexRoute component={Registration}/>
      </Route>
      <Route path="events">
        <IndexRoute component={EventPage}/>
        <Route path="add">
          <IndexRoute component={EventAddPage}/>
        </Route>
        <Route path="detail/:eventId">
          <IndexRoute component={EventDetailPage}/>
        </Route>
        <Route path="edit/:eventId">
          <IndexRoute component={EventEditPage}/>
        </Route>
      </Route>
      <Route path="*" component={GenericNotFoundPage}/>
    </Route>
  )
};
