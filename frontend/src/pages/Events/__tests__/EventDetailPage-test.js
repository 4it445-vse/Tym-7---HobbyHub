import React from 'react';
import {EventDetailPageRaw} from '../EventDetailPage.js';
import {shallow} from 'enzyme';

/**
Tests function getSignedUsersCount.
*/
test ('get number of signed users to event', () => {
    const component = shallow(
        <EventDetailPageRaw />
    );
    expect(component.instance().getSignedUsersCount([{status:"accepted"}, {status:"accepted"}, {status:"test"}])).toBe(2);
    expect(component.instance().getSignedUsersCount([{status:"pending"}, {status:"accepted"}, {status:"test"}])).toBe(1);
    expect(component.instance().getSignedUsersCount([])).toBe(0);
    expect(component.instance().getSignedUsersCount([{status:"pending"}])).toBe(0);
    expect(component.instance().getSignedUsersCount(null)).toBe(0);
    expect(component.instance().getSignedUsersCount(undefined)).toBe(0);
});

/**
isEventCreatedByMe
*/
test ('is event created by logged in user?', () => {
    const component = shallow(
        <EventDetailPageRaw />
    );
    expect(component.instance().isEventCreatedByMe({user:{id:1}}, 1)).toBe(true);
    expect(component.instance().isEventCreatedByMe({user:{id:1}}, 2)).toBe(false);
    expect(component.instance().isEventCreatedByMe({user:{}}, 2)).toBe(false);
    expect(component.instance().isEventCreatedByMe({}, 2)).toBe(false);
});
