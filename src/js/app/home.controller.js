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
                that.allBlogs = getBlogCategory(blogs);
            });


        /**
         * Sends the categoryId for eachBlog into the getCategory method on the service
         * @return  {String}     the category name
         */
        function getBlogCategory(blogs) {
            if(!blogs || blogs === null) {
                return;
            }
            blogs.forEach(function(blog) {
                blogsite.getCategory(blog.categoryId)
                    .then(function(categoryname) {
                        blog.category = categoryname;
                    });
            });
            return blogs;
        }

    }


})();
