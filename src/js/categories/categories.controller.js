(function () {
    'use strict';

    angular.module('blog')
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['$stateParams', 'blogsite'];

    function CategoriesController($stateParams, blogsite) {
        var that = this;
        this.allBlogs = [];
        this.categoryId = $stateParams.categoryId;
        console.log('catCtrl', this.categoryId);
        blogsite.getCategory(this.categoryId)
            .then(function(blogs) {
                console.log('blog in getPostsInCategory', blogs.posts);
                that.allBlogs = blogs.posts;
            });
    }


})();
