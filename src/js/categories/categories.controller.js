(function () {
    'use strict';

    angular.module('blog')
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['blogsite'];

    function CategoriesController(blogsite) {
        var that = this;
        this.allBlogs = [];

        blogsite.getAllBlogs()
            .then(function(blogs) {
                that.allBlogs = blogs;
            });
    }


})();
