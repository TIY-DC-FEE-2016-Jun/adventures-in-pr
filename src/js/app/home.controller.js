(function() {
    'use strict';

    angular.module('blog')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['blogsite'];

    function HomeController(blogsite) {

        var that = this;
        this.allBlogs = [];

        blogsite.getAllBlogs()
            .then(function(blogs) {
                console.log(blogs);
                that.allBlogs = blogs;
            });



    }



})();
