// site/js/routers/router.js

var app = app || {};

app.AppRouter = Backbone.Router.extend({
    // define the routes and function maps for this router
    routes: {
        "calendar":  "calendar",
        "calculate": "calculate",
        "history":   "history",
        "areogator": "areogator"
    },

    initialize: function() {
        console.log('AppRouter.initialize');
    }
});

// create an instance of our router.
var MarsAppRouter = new app.AppRouter();
