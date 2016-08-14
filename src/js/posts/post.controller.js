(function() {
    'use strict';

    angular.module('blog')
        .controller('PostController', PostController);

    PostController.$inject = ['$stateParams', 'blogsite'];

    function PostController($stateParams, blogsite) {
        var that = this;

        this.postId = $stateParams.postId;
        console.log(this.postId);

        this.postData = {};

        blogsite.getPost(this.postId)
            .then(function(response) {
                that.postData = response.data;
                console.log(that.postData);
            });
    }

})();
