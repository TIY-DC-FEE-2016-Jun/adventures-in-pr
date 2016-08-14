(function() {
    'use strict';

    angular.module('blog')
        .controller('PostController', PostController);

    PostController.$inject = ['$stateParams', 'blogsite'];

    function PostController($stateParams, blogsite) {
        var that = this;

        this.message = null;

        this.postId = $stateParams.postId;
        console.log(this.postId);

        this.postData = {};

        blogsite.getPost(this.postId)
            .then(function(response) {
                that.postData = response.data;
                console.log(that.postData); 
            })
            .catch(function(err) {
                console.log('unable to find post', err.status);
                that.message = '401 - cannot find that post';
            });
    }

})();
