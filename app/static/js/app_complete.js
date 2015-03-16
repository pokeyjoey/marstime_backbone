// site/js/app.js

// Load the application once the DOM is ready using jQuery.ready.
$(function() {

    // our global pubSub object
    var pubSub = _.extend({},Backbone.Events);

    // Tab Model
    var Tab = Backbone.Model.extend({
        
        defaults: {
            id: '',
            active: false
        },

        initialize: function() {
            console.log('Tab.initialize');
        }
    });

    // Tab Collection
    var TabList = Backbone.Collection.extend({
        
        // reference to this collections model.
        model: Tab,

        initialize: function() {
            console.log('TabList.initialize');
        }

    });

    // create our global collection of tabs
    var Tabs = new TabList();
        
    // Tab View item
    var TabView = Backbone.View.extend({

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
     
    // Article View item
    var ArticleView = Backbone.View.extend({
        
        // article templates.
        templates: {
            'calendar':  _.template($('#calendar-template').html()),
            'calculate': _.template($('#calculate-template').html()),
            'history':   _.template($('#history-template').html()),
            'areogator': _.template($('#areogator-template').html()),
        },

        initialize: function() {
            console.debug('ArticleView.initialize');

            this.listenTo(pubSub, "tab:selected", this.render, this);
        },

        render: function(template) {
            console.debug('ArticleView.render');

            // if a template key is not passed in default to the calendar.
            var templatesKey = (template != undefined) ? template.id:'calendar';

            // retrieve the selected template
            var selectedTemplate = this.templates[templatesKey];

            // render the template in the DOM
            this.$el.html(selectedTemplate);

            // toggle close the bootstrap navbar
            $('#navbar').collapse('hide')

            // scroll to the top of the window.
            $(window).scrollTop(0);
    }
    });

    var AppRouter = Backbone.Router.extend({
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
    var MarsAppRouter = new AppRouter();

    // The application    
    var AppView = Backbone.View.extend({

        // Bind to the existing skeleton of the App already present in the HTML.
        el: $("#marstime"),

        articleView: '',

        // Initialize all tab views and models in the collections.
        initialize: function() {
            console.debug('AppView.initialize');

            // listen for routes changes
            this.listenTo(MarsAppRouter, 'route', this.publish, this);

            // listen for changes on the following Tabs Collection events.
            this.listenTo(Tabs, 'add', this.addTabView, this);

            // initialize all tabs
            Tabs.add(tabsData);

            // initialize the Article view
            this.articleView = new ArticleView({el: $("#article"), id: "article"});
        },

        // Add a single tab view.
        addTabView: function(tab) {
            console.debug('AppView.addTabView');

            // creating tab views.
            // - when creating views for existing elements, pass in the dom node as el.
            var view = new TabView({model: tab, el: tab.attributes.el, id: tab.attributes.id});
            console.log(view);
        },

        // publish a signal for all listeners to display the selected views. 
        publish: function(page) {
            console.debug('AppView.publish');
            pubSub.trigger("tab:selected", {id: page});
        }
       
    });

    // create the App.
    console.debug('Instantiate the AppView');
    var App = new AppView();

    console.debug('Publish the calendar view');
    App.publish('calendar');

    console.debug('Backbone.history.start');
    Backbone.history.start();
});
