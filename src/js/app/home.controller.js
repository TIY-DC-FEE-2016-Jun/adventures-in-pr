(function() {
    'use strict';

    angular.module('blog')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', 'blogsite'];

    function HomeController($state, blogsite) {

        var that = this;
        this.allBlogs = [];

        blogsite.getAllBlogs()
            .then(function(blogs) {
                console.log(blogs);
                that.allBlogs = blogs;
            });

        this.goToPost = function goToPost(author, title) {
            $state.go('post', {'authorName': author, 'postTitle': title}); 
        };

    }



})();
