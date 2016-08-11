(function() {
    'use strict';

    var assert = chai.assert;

    suite('blogsite service', function() {
        var blogsite, $httpBackend;

        setup(module('blog'));

        setup(inject(function(_blogsite_, _$httpBackend_) {
            blogsite = _blogsite_;
            $httpBackend = _$httpBackend_;



        }));

        test('blogsite service functions exist', function() {
            assert.isFunction(blogsite.createUser, 'createUser function exists');
            assert.isFunction(blogsite.getAllCategories, 'getAllCategories function exists');
            assert.isFunction(blogsite.login, 'login function exists');
            assert.isFunction(blogsite.isLoggedIn, 'isLoggedIn function exists');
            assert.isFunction(blogsite.logOut, 'logOut function exists');
        });

        test('getAllCategories able to retrieve categories', function() {
            var result = blogsite.getAllCategories();

            assert.isObject(result, 'getAllCategories returns an object');
            assert.isFunction(result.then, 'result has a then method');
            assert.isFunction(result.catch, 'result has a catch method');

            result
                .then(function(categories){
                    assert.isArray(categories, 'the data in then method is an array');
                    assert.isObject(categories[0], 'inside categories is an object');
                    assert.strictEqual(categories[0].name, 'each object has a name');
                });

        });


    });



})();
