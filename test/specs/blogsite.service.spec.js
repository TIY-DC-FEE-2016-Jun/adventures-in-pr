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
                .when('POST', 'https://tiy-blog-api.herokuapp.com/api/Authors', {
                    name: 'Jon',
                    email: 'jon@yahoo.com',
                    password: '123456789'
                })
                .respond({
                    data: {email: 'jon@yahoo.com', id: '1234', name: 'Jon'}
                });

            $httpBackend
                .when('POST', 'https://tiy-blog-api.herokuapp.com/api/Authors', {
                    name: null,
                    email: 'jon@yahoo.com',
                    password: '123456789'
                })
                .respond({
                    err: {status: 401}
                });

        }));

        test('blogsite service functions exist', function() {
            assert.isFunction(blogsite.createUser, 'createUser function exists');
            assert.isFunction(blogsite.getAllCategories, 'getAllCategories function exists');
            assert.isFunction(blogsite.login, 'login function exists');
            assert.isFunction(blogsite.isLoggedIn, 'isLoggedIn function exists');
            assert.isFunction(blogsite.logOut, 'logOut function exists');
        });

        test('create user fn successfully returns new author object', function(done) {
            var result = blogsite.createUser('Jon', 'jon@yahoo.com', '123456789');

            assert.isObject(result, 'createUser returns an object');
            assert.isFunction(result.then, 'result has a then method');
            assert.isFunction(result.catch, 'result has a catch method');

            result
                .then(function(newAuthor) {
                    assert
                        .strictEqual(
                            newAuthor.data.data.email,
                            'jon@yahoo.com',
                            'newAuthor has an email'
                        );
                    assert.strictEqual(newAuthor.data.data.name, 'Jon', 'newAuthor has a name');
                    assert.strictEqual(newAuthor.data.data.id, '1234', 'newAuthor has an id');
                    done();
                })
                .catch(function(err) {
                    console.log(err);
                    assert.isFail('should not be in catch for createAuthor');
                    done();
                });

            $httpBackend.flush();
        });

        test('cannot create a new author without a name', function(done) {
            var result = blogsite.createUser(null, 'jon@yahoo.com', '123456789');

            result
                .then(function(err) {
                    console.log(err);
                    assert.fail('should not be in then if author has no name');
                    done();
                })
                .catch(function(err) {
                    assert.strictEqual(err.status, '401', 'cannot create new author w/o name');
                    done();
                });

            $httpBackend.flush();
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


    });



})();
