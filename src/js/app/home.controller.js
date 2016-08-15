(function() {
    'use strict';

    angular.module('blog')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', 'blogsite'];

    function HomeController($state, blogsite) {
        var that = this;

        this.allBlogs = [];
        this.limit = 5;
        this.offset = 0;
        this.offsetIncrement = 5;


        //TODO Combine older and newer posts function to one.
        this.goToOlderPosts = function goToOlderPosts() {
            that.offset = (that.offset + that.offsetIncrement);
            blogsite.getPostsByDate(that.limit, that.offset)
                .then(function(olderBlogs) {
                    that.allBlogs = olderBlogs;
                })
                .catch(function(err) {
                    console.error('unable to get older posts', err.status);
                });
        };

        this.goToNewerPosts = function goToNewerPosts() {
            that.offset = (that.offset - that.offsetIncrement);
            if (that.offset < 0) {
                that.offset = 0;
            }
            blogsite.getPostsByDate(that.limit, that.offset)
                .then(function(newerBlogs) {
                    that.allBlogs = newerBlogs;
                })
                .catch(function(err) {
                    console.error('unable to get newer posts', err.status);
                });
        };


        blogsite.getPostsByDate(this.limit, this.offset)
            .then(function(blogs) {
                that.allBlogs = blogs;
            })
            .catch(function(response) {
                //TODO do somethign if can't retrieve blogs
                console.log(response);
            });

    }


})();
