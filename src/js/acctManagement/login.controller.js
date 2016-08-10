(function() {
    'use strict';

    angular.module('blog')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', 'blogsite'];

    function LoginController($state, blogsite) {
        var that = this;

        this.isLoggedIn = blogsite.isLoggedIn();

        this.userInfo = {};

        this.authenticate = function authenticate() {
            console.log('start auth');
            blogsite.login(that.userInfo.email, that.userInfo.password)
                .then(function(data) {
                    console.log('authenticated', data);
                    $state.go('createPost');
                })
                .catch(function(err) {
                    console.error('unable to authenticate', err.status);
                });
        };
    }
})();
