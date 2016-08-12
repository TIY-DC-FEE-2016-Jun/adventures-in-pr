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

        function createPost(blogPost) {
            console.log(blogPost);
            
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
