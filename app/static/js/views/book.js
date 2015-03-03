// library/js/views/book.js

var app = app || {};

app.BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'bookContainer',
    template: _.template( $('#bookTemplate').html() ),

    events: {
        'click .delete': 'deleteBook'
    },

    render: function() {
        // this.el is what we defined in tagName, use $el to get access to 
        // JQuery html() function.
        this.$el.html( this.template( this.model.attributes ));

        return this;
    },

    deleteBook: function() {
        // Delete Model
        this.model.destroy();

        // Delete View
        this.remove();
    }
});
