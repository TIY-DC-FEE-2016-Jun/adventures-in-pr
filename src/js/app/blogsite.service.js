(function() {
    'use strict';

    angular.module('blog')
        .factory('blogsite', BlogSiteService);

    BlogSiteService.$inject = ['$http'];

    function BlogSiteService($http) {
        var apiToken;
        var currentUser;

        return {
            createUser: createUser,
            login: login
        };

        /**
         * Logged in user can create new user
         * @param  {String} name     Name of new user
         * @param  {String} email    Email of new user
         * @param  {String} password Password with 1 special char and min 8 char long
         * @return {Promise}         An XmlHttpRequest object that implements promise methods
         */
        function createUser(name, email, password) {
            if (!name || !email || !password) {
                return null;
            } else if (password.split('').length > 8) {
                return null;
            }

            return $http({
                url: 'https://tiy-blog-api.herokuapp.com/api/Authors',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: angular.toJson({
                    'name': name,
                    'email': email,
                    'password': password
                })
            });
        }

        function login(email, password) {
            if (!email || !password) {
                return null;
            }

            return $http({
                url: 'https://tiy-blog-api.herokuapp.com/api/Authors/login',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: angular.toJson({
                    'email': email,
                    'password': password
                })
            })
            .then(function(userData) {
                apiToken = userData.id;
                currentUser = userData;
            });
        }
    }


})();
