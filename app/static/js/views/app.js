// site/js/views/app.js

var app = app || {};

// The application    
app.AppView = Backbone.View.extend({

    // Bind to the existing skeleton of the App already present in the HTML.
    el: $("#marstime"),

    articleView: '',

    // Initialize all tab views and models in the collections.
    initialize: function() {
        console.debug('AppView.initialize');

        // listen for routes changes
        this.listenTo(app.MarsAppRouter, 'route', this.publish, this);

        // listen for changes on the following Tabs Collection events.
        this.listenTo(app.Tabs, 'add', this.addTabView, this);

        // initialize all tabs
        app.Tabs.add(tabsData);

        // initialize the Article view
        // - render the intial view
        this.articleView = new app.ArticleView({el: $("#article"), id: "article"});
    },

    // Add a single tab view.
    addTabView: function(tab) {
        console.debug('AppView.addTabView');

        // creating tab views.
        // - when creating views for existing elements, pass in the dom node as el.
        var view = new app.TabView({model: tab, el: tab.attributes.el, id: tab.attributes.id});
        console.log(view);
    },

    // publish a signal for all listeners to display the selected views. 
    publish: function(page) {
        console.debug('AppView.publish');
        pubSub.trigger("tab:selected", {id: page});
    }
   
});
