(function(){
    'use strict';

    angular.module('blog')
        .controller('CreatePostController', CreatePostController);

    CreatePostController.$inject = ['blogsite'];

    function CreatePostController(blogsite) {
        var that = this;
        this.categories = [];
        this.blogPost = {};
        this.createPost = createPost;

        /**
         * Sends a blogPost to the service submitBlogPost and then resets
         * blogPost to be an empty object to reset form.
         * @param  {Object} blogPost contains blogpost title, content, and category id
         * @return {Void}
         */
        function createPost(blogPost) {
            console.log(blogPost);
            blogsite.submitBlogPost(blogPost);
            that.blogPost = {};
        }

        blogsite.getAllCategories()
            .then(function(data) {
                that.categories = data;
            })
            .catch(function(error) {
                that.categories = [{name: 'no category list exists'}];
                console.error(error);
            });


    }

})();
