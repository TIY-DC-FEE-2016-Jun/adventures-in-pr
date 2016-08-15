(function () {
    'use strict';

    angular.module('blog')
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['$stateParams', '$state', 'blogsite'];

    function CategoriesController($stateParams, $state, blogsite) {
        var that = this;
        this.allBlogs = [];
        this.categoryId = $stateParams.categoryId;
        this.categoryName = null;
        this.delete = deletePost;

        categoryInit();

        /**
         * Loads the info needed for the category view
         * @return {Void}
         */
        function categoryInit() {
            blogsite.getCategory(that.categoryId)
                .then(function(blogs) {
                    that.allBlogs = blogs.posts;
                    that.categoryName = blogs.name;
                });
        }

        /**
         * Deletes a post with given blog Id
         * @param  {String}   blogId    id of blog to delete
         * @return {Void}
         */
        function deletePost(blogId) {
            console.log('in deletePost', blogId);
            blogsite.deleteBlogPost(blogId);
            that.allBlogs.forEach(function(blog) {
                if (blogId === blog.id) {
                    that.allBlogs.splice(that.allBlogs.indexOf(blog), 1);
                }
            });
            return that.allBlogs;
        }
    }


})();
