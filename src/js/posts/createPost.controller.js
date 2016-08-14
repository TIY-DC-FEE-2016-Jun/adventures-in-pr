(function(){
    'use strict';

    angular.module('blog')
        .controller('CreatePostController', CreatePostController);

    CreatePostController.$inject = ['blogsite', '$state'];

    function CreatePostController(blogsite, $state) {
        var that = this;
        this.categories = [];
        this.blogPost = {};
        this.currentAuthor = null;
        this.createPost = createPost;


        blogsite.getLoggedInAuthor()
            .then(function(author) {
                that.currentAuthor = author;
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
            blogsite.submitBlogPost(blogPost);
            that.blogPost = {};
            blogsite.getAllBlogs()
                .then(function(data) {
                    $state.go('home', {
                        posts: data
                    });
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
