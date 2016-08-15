(function() {
    'use strict';

    angular.module('blog')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$stateParams', '$state', 'blogsite'];

    function LoginController($stateParams, $state, blogsite) {
        var that = this;

        this.message = $stateParams.message;

        this.userInfo = {};

        this.authenticate = function authenticate() {
            console.log('start auth');
            blogsite.login(that.userInfo.email, that.userInfo.password)
                .then(function(data) {
                    console.log('authenticated user', data);
                    $state.go('createPost');
                })
                .catch(function(response) {
                    console.error('unable to authenticate', response.status);
                    that.userInfo.password = '';
                    if (response.status === 400) {
                        that.message = response.message;
                    } else if (response.data.error.status === 401) {
                        that.message = 'Unable to login, please check your email and password!';
                    } else {
                        that.message = 'Oops! Something went wrong.';
                    }
                });
        };
    }
})();
