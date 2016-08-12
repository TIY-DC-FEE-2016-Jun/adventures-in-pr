(function() {
    'use strict';

    var assert = chai.assert;

    suite('blogsite service', function() {
        var blogsite, $httpBackend;

        setup(module('blog'));

        setup(inject(function(_blogsite_, _$httpBackend_) {
            blogsite = _blogsite_;
            $httpBackend = _$httpBackend_;

            $httpBackend
                .whenGET('https://tiy-blog-api.herokuapp.com/api/Categories')
                .respond([
                    {id: 798797, name: 'updates'}
                ]);

            $httpBackend
                .whenGET('/js/app/home.template.html')
                .respond('<h1>Mock Home Template</h1>');

            $httpBackend
                .whenPOST('https://tiy-blog-api.herokuapp.com/api/Posts')
                .respond({data: {
                    id: '38297',
                    title: 'testing title',
                    content: 'test content',
                    date: new Date(),
                    categoryId: '8799'
                }});
        }));

        test('blogsite service functions exist', function() {
            assert.isFunction(blogsite.createUser, 'createUser function exists');
            assert.isFunction(blogsite.getAllCategories, 'getAllCategories function exists');
            assert.isFunction(blogsite.login, 'login function exists');
            assert.isFunction(blogsite.isLoggedIn, 'isLoggedIn function exists');
            assert.isFunction(blogsite.logOut, 'logOut function exists');
        });

        test('getAllCategories able to retrieve categories', function(done) {
            var result = blogsite.getAllCategories();

            assert.isObject(result, 'getAllCategories returns an object');
            assert.isFunction(result.then, 'result has a then method');
            assert.isFunction(result.catch, 'result has a catch method');

            result
                .then(function(categories) {
                    assert.isArray(categories, 'the data in then method is an array');
                    assert.isObject(categories[0], 'inside categories is an object');
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    assert.isFail('should not be in catch for getAllCategories');
                    done();
                });

            $httpBackend.flush();
        });

        test('getAuthor function is able to get author', function() {

        });

        test('submitBlogPost able to add post', function() {

        });

    });



})();
