// site/js/models/tab.js

var app = app || {};

// Tab Model
app.Tab = Backbone.Model.extend({
    
    defaults: {
        id: '',
        active: false
    },

    initialize: function() {
        console.log('Tab.initialize');
    }
});
