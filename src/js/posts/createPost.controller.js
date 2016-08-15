(function(){
    'use strict';

    angular.module('blog')
        .controller('CreatePostController', CreatePostController);

    CreatePostController.$inject = ['$state', 'blogsite'];

    function CreatePostController($state, blogsite) {
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
         * @return {Void}
         */
        function createPost(blogPost) {
            console.log(blogPost);
            blogPost.authorId = that.currentAuthor.id;
            blogsite.submitBlogPost(blogPost)
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
