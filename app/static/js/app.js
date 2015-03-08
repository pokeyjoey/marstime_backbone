// site/js/app.js

var app = app || {};

// our global pubSub object
var pubSub = _.extend({},Backbone.Events);

// Tab Model
var Tab = Backbone.Model.extend({
    
    defaults: {
        id: '',
        active: false
    }
});

// Tab Collection
var TabList = Backbone.Collection.extend({
    
    // reference to this collections model.
    model: Tab

});

// create our global collection of tabs
var Tabs = new TabList;
    
// Tab View item
var TabView = Backbone.View.extend({

    active: false,

    events: {
        "click": "publish",
    },

    initialize: function() {

        // listen for changes on the following Tab Model events.
        this.listenTo(pubSub, "tab:selected", this.clicked, this);
    },

    clicked: function(tab) {
        if (tab.selected === this.id){
            this.$el.addClass('active');
        } else {
            this.$el.removeClass('active');
        }
    },
        
    publish: function() {
        console.debug('Tabview.publish:' + this.id);
        pubSub.trigger("tab:selected", {selected: this.id});
    }

});

// The application    
var AppView = Backbone.View.extend({

    // Bind to the existing skeleton of the App already present in the HTML.
    el: $("#marstime"),

    // Initialize all tab views and models in the collections.
    initialize: function() {

        // listen for changes on the following Tabs Collection events.
        this.listenTo(Tabs, 'add', this.addTabView, this);

        // initialize all tabs
        Tabs.add(tabsData);

    },

    // Add a single tab view.
    addTabView: function(tab) {
        var view = new TabView({model: tab});
        console.log(view);
    }
});

$(function() {
    // create the App.
    var App = new AppView;
});
