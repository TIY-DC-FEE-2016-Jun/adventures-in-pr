(function(){
    'use strict';

    angular.module('blog')
        .controller('CreatePostController', CreatePostController);

    CreatePostController.$inject = ['$state', '$q', 'blogsite'];

    function CreatePostController($state, $q, blogsite) {
        var that = this;
        this.categories = [];
        this.blogPost = {};
        this.currentAuthor = null;
        this.createPost = createPost;

        blogsite.getAuthor(blogsite.getLoggedInAuthor().userId)
            .then(function(author) {
                that.currentAuthor = author.name;
            });

        /**
         * Sends a blogPost to the service submitBlogPost and then resets
         * blogPost to be an empty object to reset form.
         * @param  {Object}  blogPost contains blogpost title, content, and category id
         * @return {Promise}
         */
        function createPost(blogPost) {
            console.log(blogPost);
            if(!blogPost) {
                return $q.reject(new Error('please provide blogPost'));
            }
            return blogsite.submitBlogPost(blogPost)
                .then(function() {
                    that.blogPost = {};
                    $state.go('home');
                })
                .catch(function(response) {
                    //TODO show a error message
                    console.log(response);
                });

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
