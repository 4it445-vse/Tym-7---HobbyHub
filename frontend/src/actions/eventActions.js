export const EVENT_ADD = 'EVENT_ADD';

export const addEvent = event => {
    return {
        type: EVENT_ADD,
        event
    };
};
