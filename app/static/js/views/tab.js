// site/js/views/tab.js

var app = app || {};

// Tab View item
app.TabView = Backbone.View.extend({

    active: false,

    initialize: function() {
        console.debug('Tabview.initialize');
        this.listenTo(pubSub, "tab:selected", this.render, this);
    },

    render: function(tab) {
        console.debug('Tabview.render');
        if (tab.id === this.id){
            this.$el.addClass('active');
        } else {
            this.$el.removeClass('active');
        }
    }
});
