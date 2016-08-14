(function() {
    'use strict';

    angular.module('blog')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', 'blogsite'];

    function HomeController($state, blogsite) {
        var that = this;
        this.allBlogs = [];

        this.goToPost = function goToPost(author, title, id) {
            $state.go('post', {'authorName': author, 'postTitle': title, 'postId': id});
        };

        blogsite.getAllBlogs()
            .then(function(blogs) {
                console.log('blogs returned from getAllBlogs:', blogs);
                blogs.forEach(function(blog) {
                    blog.content = blog.content.substring(0, blog.content.indexOf('.')+1) ;
                });
                that.allBlogs = blogs;
            });

    }


})();
