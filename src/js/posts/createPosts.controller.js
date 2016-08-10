(function(){
    'use strict';

    angular.module('blog')
        .controller('CreatePostController', CreatePostController);

    CreatePostController.$inject = ['blogsite'];

    function CreatePostController(blogsite) {
        var that = this;
        this.categories = [];

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
