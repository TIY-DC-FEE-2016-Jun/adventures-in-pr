(function(){
    'use strict';

    var assert = chai.assert;

    suite('categories controller', function() {

        var catCtrl, $rootScope, $httpBackend;
        var mockBlogSiteService = {};
        var mockStateParams = {};

        setup(module('blog'));

        setup(module(function($provide) {
            $provide.value('$stateParams', mockStateParams);
            $provide.value('blogsite', mockBlogSiteService);
        }));

        setup(inject(function($controller, $q, _$rootScope_, _$httpBackend_) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;

            $httpBackend
                .whenGET('/js/app/home.template.html')
                .respond('<h1>Recent Posts</h1>');

            $httpBackend
                .whenGET('/js/categories/category.template.html')
                .respond('<h1>Posts in Category</h1>');

            // Set up mockStateParams
            mockStateParams.categoryId = '1234567890';

            // Set up mockBlogSiteService
            mockBlogSiteService.isLoggedIn = true;

            // Set up mockBlogSiteService.getCategory
            mockBlogSiteService.getCategory = function(categoryId) {
                mockBlogSiteService.getCategory.called++;
                mockBlogSiteService.getCategory.argument = categoryId;

                var blogToDelete = { id: 'fakeBlogId' };
                var blogToKeep = { id: 'toKeep' };
                var fakeBlogs = { posts: [ blogToDelete, blogToKeep ], name: 'blog' };

                var def = $q.defer();
                def.resolve(fakeBlogs);
                return def.promise;
            };
            mockBlogSiteService.getCategory.called = 0;

            // Set up mockBlogSiteService.deleteBlogPost
            mockBlogSiteService.deleteBlogPost = function(blogId) {
                mockBlogSiteService.deleteBlogPost.called++;
                mockBlogSiteService.deleteBlogPost.argument = blogId;
            };
            mockBlogSiteService.deleteBlogPost.called = 0;

            // Call the constructor
            catCtrl = $controller('CategoriesController');

            $rootScope.$digest();
        }));

        test('When constructor is called, categoryId and loggedIn are set',
            function() {
                assert.strictEqual(catCtrl.categoryId, mockStateParams.categoryId);
                assert.strictEqual(catCtrl.loggedIn, mockBlogSiteService.isLoggedIn);
            });

        test('When constructor is called, getCategory is called with\
                            categoryId and allBlogs and categoryName are set',
            function() {
                assert.strictEqual(mockBlogSiteService.getCategory.called, 1);
                assert.strictEqual(mockBlogSiteService.getCategory.argument,
                                                        mockStateParams.categoryId);
                assert.isArray(catCtrl.allBlogs);
                assert.strictEqual(catCtrl.allBlogs.length, 2);
                assert.strictEqual(catCtrl.categoryName, 'blog');
            });

        test('When deletePost is called, blogsite.deleteBlogPost is called with blogId',
            function() {
                var blogId = 'fakeBlogId';
                catCtrl.delete(blogId);
                assert.strictEqual(mockBlogSiteService.deleteBlogPost.called, 1);
                assert.strictEqual(mockBlogSiteService.deleteBlogPost.argument, blogId);
            });

        test('When deletePost is called, it deletes the blog with blogId from allBlogs',
            function() {
                var blogId = 'fakeBlogId';

                assert.strictEqual(catCtrl.allBlogs.length, 2);
                assert.strictEqual(catCtrl.allBlogs[0].id, blogId);
                assert.strictEqual(catCtrl.allBlogs[1].id, 'toKeep');

                catCtrl.delete(blogId);

                assert.strictEqual(catCtrl.allBlogs.length, 1);
                assert.strictEqual(catCtrl.allBlogs[0].id, 'toKeep');
            });
    });



})();
