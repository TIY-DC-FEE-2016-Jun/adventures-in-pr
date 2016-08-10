(function() {
    'use strict';

    angular.module('blog')
        .controller('NavController', NavController);

    NavController.$inject = ['$state', 'blogsite'];

    function NavController($state, blogsite) {
        this.loggedIn = blogsite.isLoggedIn;

        this.logOut = function logOut() {
            blogsite.logOut();
            $state.go('home');
        };
    }
})();
