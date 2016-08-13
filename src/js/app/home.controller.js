(function() {
    'use strict';

    angular.module('blog')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['blogsite'];

    function HomeController(blogsite) {
        var that = this;
        this.allBlogs = null;

        blogsite.getAllBlogs()
            .then(function(blogs) {
                that.allBlogs = blogs;
            });


    }


})();
