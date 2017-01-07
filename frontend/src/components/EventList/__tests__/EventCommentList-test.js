import React from 'react';
import {EventCommentList} from '../EventCommentList.js';
import {shallow} from 'enzyme';

test ('check if comment is removable by comment and event creator success', () => {
    const component = shallow(
        <EventCommentList authorId="1" userId="1" />
    );
    expect(component.instance().isRemovable(1)).toBe(true);
});

test ('check if comment is removable by comment creator success', () => {
    const component = shallow(
        <EventCommentList authorId="2" userId="1" />
    );
    expect(component.instance().isRemovable(1)).toBe(true);
});

test ('check if comment is removable by event creator success', () => {
    const component = shallow(
        <EventCommentList authorId="1" userId="1" />
    );
    expect(component.instance().isRemovable(5)).toBe(true);
});

test ('check if comment is removable by event foreigner failure', () => {
    const component = shallow(
        <EventCommentList authorId="1" userId="2" />
    );
    expect(component.instance().isRemovable(1)).toBe(false);
});
