(function() {
    'use strict';

    angular.module('blog')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', 'blogsite'];

    function HomeController($state, blogsite) {
        var that = this;

        this.allBlogs = [];

        /**
         * Assigns first sentence of blog post to content property of blog data
         * @param  {Object} blog Object with the blog post data
         * @return {void}
         */
        function getFirstSentence(blog) {
            blog.content = blog.content.substring(0, blog.content.indexOf('.')+1) ;
        }

        blogsite.getAllBlogs()
            .then(function(blogs) {
                console.log('blogs returned from getAllBlogs:', blogs);
                blogs.forEach(function(blog) {
                    getFirstSentence(blog);
                });
                that.allBlogs = blogs;
            });

        this.limit = 5;
        this.offset = 0;
        this.offsetIncrement = 5;
        
        this.goToOlderPosts = function goToOlderPosts() {
            that.offset = (that.offset + that.offsetIncrement);

            blogsite.getPostByDate(that.limit, that.offset)
                .then(function(olderBlogs) {
                    var olderBlogsArray = olderBlogs.data;
                    console.log('olderBlogs', olderBlogsArray);
                    if (olderBlogsArray === []) {
                        return null;
                    }

                    olderBlogsArray.forEach(function(blog) {
                        getFirstSentence(blog);
                    });

                    that.allBlogs = olderBlogsArray;
                })
                .catch(function(err) {
                    console.error('unable to get older posts', err.status);
                });

            console.log('new offset', that.offset);
        };


        this.goToPost = function goToPost(author, title, id) {
            $state.go('post', {'authorName': author, 'postTitle': title, 'postId': id});
        };
    }


})();
