// site/js/app.js

var app = app || {};

// Load the application once the DOM is ready using jQuery.ready.
$(function() {

    // our global pubSub object
    var pubSub = _.extend({},Backbone.Events);

    // create the App.
    console.debug('Instantiate the AppView');
    var App = new app.AppView();

    console.debug('Publish the calendar view');
    App.publish('calendar');

    console.debug('Backbone.history.start');
    Backbone.history.start();
});
