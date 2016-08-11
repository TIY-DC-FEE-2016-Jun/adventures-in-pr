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

    });



})();
