// site/js/models/book.js

var app = app || {};

app.Book = Backbone.Model.extend({
        defaults: {
            coverImage: 'img/placeholder.png',
            title: 'No title',
            author: 'unknown',
            releaseDate: 'unknown',
            keywords: 'None'
        }
        
});

