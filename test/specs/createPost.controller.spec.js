(function(){
    'use strict';

    var assert = chai.assert;

    suite('createPost controller', function() {

        var cpCtrl, $rootScope, $httpBackend;
        var mockBlogSiteService = {};
        var mockState = {};

        setup(module('blog'));

        setup(module(function($provide) {
            $provide.value('$state', mockState);
            $provide.value('blogsite', mockBlogSiteService);
        }));

        setup(inject(function($controller, $q, _$rootScope_, _$httpBackend_) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;

            $httpBackend
                .whenGET('/js/app/home.template.html')
                .respond('<h1>Recent Posts</h1>');

            var author = {userId: '123456789'};

            mockBlogSiteService.getLoggedInAuthor = function() {
                return author;
            };

            mockBlogSiteService.getAuthor = function(id) {
                var def = $q.defer();
                def.resolve({id: id, name: 'author'});
                return def.promise;
            };

            mockBlogSiteService.getAllCategories = function() {
                var def = $q.defer();
                def.resolve([{name: 'misc', id: 'asdfghjk'}]);
                return def.promise;
            };

            mockBlogSiteService.submitBlogPost = function(blogPost) {
                if(blogPost) {
                    blogPost.id = '123456';
                    return $q.resolve(blogPost);
                } else {
                    return $q.reject(new Error('blogPost is missing'));
                }

            };

            mockState.go = function(stateName) {
                mockState.go.called++;
                mockState.go.argument = stateName;
            };
            mockState.go.called = 0;

            cpCtrl = $controller('CreatePostController');

            $rootScope.$digest();
        }));

        test('submitBlogPost fails with no blogPost', function(done) {
            var returnVal = cpCtrl.createPost();
            assert.isObject(returnVal);
            assert.isFunction(returnVal.then);
            assert.isFunction(returnVal.catch);
            returnVal
                .then(function() {
                    assert.fail('should not suceed without argument');
                    done();
                })
                .catch(function(err) {
                    assert.ok(err instanceof Error);
                    done();
                });
            $rootScope.$digest();
        });

        test('createPost can submit blogs', function(done) {
            //TODO write a test for bad data
            var returnVal = cpCtrl.createPost(
                {title: 'abc', content: 'asddf', authorId: 'rtyu', categoryId: '34567'});
            assert.isObject(returnVal);
            assert.isFunction(returnVal.then);
            assert.isFunction(returnVal.catch);

            returnVal
                .then(function() {
                    assert.strictEqual(mockState.go.called, 1);
                    assert.strictEqual(mockState.go.argument, 'home');
                    done();
                })
                .catch(function() {
                    assert.fail('submitBlogPost shouldn\'t fail.');
                    done();
                });
            $rootScope.$digest();
        });


    });



})();
