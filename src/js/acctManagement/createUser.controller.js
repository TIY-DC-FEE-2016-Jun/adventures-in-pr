(function() {
    'use strict';

    angular.module('blog')
        .controller('CreateUserController', CreateUserController);

    CreateUserController.$inject = ['blogsite'];

    function CreateUserController(blogsite) {
        var that = this;

        this.message = null;

        this.userInfo = {};

        this.newAuthor = function newAuthor() {
            console.log('start creating new user');

            blogsite.createUser(
                that.userInfo.name,
                that.userInfo.email,
                that.userInfo.password
            )
            .then(function(data) {
                console.log('new author', data);
                that.message = 'Success! You\'ve create a new author.';
            })
            .catch(function(err) {
                console.log('unable to create new user', err.status);
                that.message = 'Invalid author information';
            });
        };

    }

})();
