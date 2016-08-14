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
                console.log('blogs returned from getAllBlogs:', blogs);
                blogs.forEach(function(blog) {
                    blog.content = blog.content.substring(0, blog.content.indexOf('.')+1) ;
                });
                that.allBlogs = blogs;
            });



    }



})();
