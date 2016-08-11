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
                .catch(function(err) {
                    console.error('unable to authenticate', err.status);

                    that.message = '401 Error - user/password combo does not exist'; 
                });
        };
    }
})();
