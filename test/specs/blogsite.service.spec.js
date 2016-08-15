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

            $httpBackend
                .when('POST', 'https://tiy-blog-api.herokuapp.com/api/Authors', {
                    name: 'Jon',
                    email: null,
                    password: '123456789'
                })
                .respond({
                    err: {status: 401}
                });

            $httpBackend
                .when('POST', 'https://tiy-blog-api.herokuapp.com/api/Authors', {
                    name: 'Jon',
                    email: 'jon@yahoo.com',
                    password: null
                })
                .respond({
                    err: {status: 401}
                });

            $httpBackend
                .when('POST', 'https://tiy-blog-api.herokuapp.com/api/Authors', {
                    name: 'Jon',
                    email: 'jon@yahoo.com',
                    password: 123
                })
                .respond({
                    err: {status: 401}
                });

            $httpBackend
                .when('POST', 'https://tiy-blog-api.herokuapp.com/api/Authors', {

                })
                .respond({
                    err: {status: 401}
                });

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
                    assert.isFail('should not be in catch for createUser');
                    done();
                });

            $httpBackend.flush();
        });

        test('cannot create a new author without arguments', function(done) {
            var result = blogsite.createUser();

            result
                .then(function(err) {
                    console.log(err);
                    assert.fail('should not be in then if new author fn has no arguments');
                    done();
                })
                .catch(function(err) {
                    assert.strictEqual(err.status, 400, 'cannot create new author w/o name');
                    done();
                });

            $httpBackend.flush();
        });

        test('cannot create a new author without a name', function(done) {
            var result = blogsite.createUser(null, 'jon@yahoo.com', '123456789');

            result
                .then(function(err) {
                    console.log(err);
                    assert.fail('should not be in then if new author has no name');
                    done();
                })
                .catch(function(err) {
                    assert.strictEqual(err.status, 400, 'cannot create new author w/o name');
                    done();
                });

            $httpBackend.flush();
        });

        test('cannot create a new author without an email', function(done) {
            var result = blogsite.createUser('Jon', null, '123456789');

            result
                .then(function(err) {
                    console.log(err);
                    assert.fail('should not be in then if author has no email');
                    done();
                })
                .catch(function(err) {
                    assert.strictEqual(err.status, 400, 'cannot create new author w/o email');
                    done();
                });

            $httpBackend.flush();
        });

        test('cannot create a new author if email is not valid', function(done) {
            var resultOne = blogsite.createUser('Jon', 123, '123456789');

            resultOne
                .then(function(err) {
                    console.log(err);
                    assert.fail('should not be in then if new author has invalid email');
                    done();
                })
                .catch(function(err) {
                    assert.strictEqual(
                        err.status,
                        400,
                        'cannot create new author with invalid email'
                    );
                    done();
                });

            $httpBackend.flush();
        });

        test('cannot create a new author without a password', function(done) {
            var result = blogsite.createUser('Jon', 'jon@yahoo.com', null);

            result
                .then(function(err) {
                    console.log(err);
                    assert.fail('should not be in then if new author has no password');
                    done();
                })
                .catch(function(err) {
                    assert.strictEqual(err.status, 400, 'cannot create new author w/o password');
                    done();
                });

            $httpBackend.flush();
        });

        test('cannot create a new author without a password', function(done) {
            var result = blogsite.createUser('Jon', 'jon@yahoo.com', 123);

            result
                .then(function(err) {
                    console.log(err);
                    assert.fail(
                        'should not be in then if new author does not have valid password'
                    );
                    done();
                })
                .catch(function(err) {
                    assert.strictEqual(
                        err.status,
                        400,
                        'cannot create new author w/o valid password'
                    );
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
