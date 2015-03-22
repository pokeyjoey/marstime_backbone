// site/js/collections/tabs.js

var app = app || {};

// Tab Collection
var TabList = Backbone.Collection.extend({
    
    // reference to this collections model.
    model: app.Tab,

    initialize: function() {
        console.log('TabList.initialize');
    }

});

// create our global collection of tabs
app.Tabs = new TabList();
