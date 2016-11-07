'use strict';

module.exports = function(app) {
  app.dataSources.mysqlds.autoupdate('AppUser', function(err) {
    const { AppUser } = app.models;
    if (!AppUser) { return; }
  });

  app.dataSources.mysqlds.autoupdate('Event', function(err) {
    const { Event } = app.models;
    if (!Event) { return; }
  });

  app.dataSources.mysqlds.autoupdate('EventUser', function(err) {
    const { EventUser } = app.models;
    if (!EventUser) { return; }
  });

  app.dataSources.mysqlds.autoupdate('Tag', function(err) {
    const { Tag } = app.models;
    if (!Tag) { return; }
    Tag.count({}, function(err, count) {
      if (count !== 0) { return; }

      Tag.create([
        {
          name: 'tenis'
        },
        {
          name: 'fotbal'
        },
        {
          name: 'deskové hry'
        },
        {
          name: 'poker'
        },
        {
          name: 'mariáš'
        },
        {
          name: 'magic'
        },
        {
          name: 'lan party'
        },
        {
          name: 'rekreační sporty'
        },
        {
          name: 'hospodské sporty'
        },
        {
          name: 'sport'
        },
        {
          name: 'jiné'
        }
      ], function(err, products) {
        if (err) throw err;

        console.log('Models created: \n', products);
      });
    });
  });
};
