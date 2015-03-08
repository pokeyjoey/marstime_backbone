// js/models/page.js

var app = app || {};

app.Page = Backbone.Model.extend({
    // Default Page attribute values
    defaults: {
        active_tab: '',
        template_url: ''
    }
});
