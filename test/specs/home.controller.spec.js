(function(){
    'use strict';

    var assert = chai.assert;

    suite('home controller', function() {

        var homeController, $rootScope, $httpBackend;
        var mockBlogSiteService = {};

        setup(module('blog'));

        setup(module(function($provide) {
            $provide.value('blogsite', mockBlogSiteService);
        }));

        setup(inject(function($controller, $q, _$rootScope_, _$httpBackend_) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;

            $httpBackend
                .whenGET('/js/app/home.template.html')
                .respond('<h1>Recent Posts</h1>');

            // Create mock version of getPostsByDate
            mockBlogSiteService.getPostsByDate = function(limit, offset) {
                mockBlogSiteService.getPostsByDate.called++;
                mockBlogSiteService.getPostsByDate.argument = (limit, offset);

                var blogPosts = [];
                for (var i = 0; i < 5; i++) {
                    var blogDate = new Date();
                    blogDate.setMonth(blogDate.getMonth() - i);
                    blogPosts.push({ date: blogDate });
                }

                var def = $q.defer();
                def.resolve(blogPosts);
                return def.promise;
            };

            // Keep track of how many times the function has been called
            mockBlogSiteService.getPostsByDate.called = 0;

            // Call the constructor
            homeController = $controller('HomeController');

            $rootScope.$digest();
        }));

        test('When the constructor is called, getPostsByDate is called with limit and offset',
            function() {
                assert.strictEqual(mockBlogSiteService.getPostsByDate.called, 1);
                assert.strictEqual(mockBlogSiteService.getPostsByDate.argument, (5, 0));
            });

        test('After the constructor is called, allBlogs has five blogPosts in it',
            function() {
                assert.strictEqual(homeController.allBlogs.length, 5);
            });

        test('After goToOlderPosts is called, allBlogs has five blogPosts in it',
            function() {
                homeController.goToOlderPosts();
                assert.strictEqual(homeController.allBlogs.length, 5);
            });

        test('After goToNewerPosts is called, allBlogs has five blogPosts in it',
            function() {
                homeController.goToNewerPosts();
                assert.strictEqual(homeController.allBlogs.length, 5);
            });

        test('When offset is less than 0, goToNewerPosts resets offset to 0',
            function() {
                homeController.goToNewerPosts();
                assert.strictEqual(homeController.offset, 0);
            });
    });



})();
