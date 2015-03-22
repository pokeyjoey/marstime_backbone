// site/js/app.js

var app = app || {};

// our global pubSub object
var pubSub = _.extend({},Backbone.Events);

// Load the application once the DOM is ready using jQuery.ready.
$(function() {

    // create the App.
    console.debug('Instantiate the AppView');
    var App = new app.AppView();

    console.debug('Publish the calendar view');
    App.publish('calendar');

    console.debug('Backbone.history.start');
    Backbone.history.start();
});
