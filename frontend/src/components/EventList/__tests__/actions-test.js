import React from 'react';
import {eventSignIn, eventSignOut} from '../actions.js';
import {EVENT_SIGN_IN, EVENT_SIGN_OUT} from '../actions.js';
import moment from 'moment';

test('event sign in action', () => {
    expect(eventSignIn(1, 1)).toEqual({
        type: EVENT_SIGN_IN,
        postData: {
            event_id: 1,
            user_id: 1,
            status: "pending",
            created: moment().format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
            resolved: moment().format('YYYY-MM-DD[T]HH:mm:ss[Z]')
        }
    });
});

test('event sign out action', () => {
    expect(eventSignOut(1, 1)).toEqual({
        type: EVENT_SIGN_OUT,
        postData: {
            event_id: 1,
            user_id: 1
        }
    });
});
