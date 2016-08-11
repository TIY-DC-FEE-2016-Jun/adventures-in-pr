(function() {
    'use strict';

    angular.module('blog')
        .factory('blogsite', BlogSiteService);

    BlogSiteService.$inject = ['$http', '$q'];

    function BlogSiteService($http, $q) {
        var apiToken;
        var currentUser;

        return {
            createUser: createUser,
            getAllCategories: getAllCategories,
            login: login,
            isLoggedIn: isLoggedIn,
            logOut: logOut
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

        /**
         * Log in to blog site
         * @param  {String} email    Email of user
         * @param  {String} password Password of user
         * @return {Promise}         XmlHttpRequest object that can implement
         *                           promise methods
         */
        function login(email, password) {
            if (!email) {
                loginError(email);
            } else if (!password) {
                loginError(password);
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
                apiToken = userData.data.id;
                currentUser = userData.data;
                console.log('currentUser', currentUser);
                localStorage.setItem('token', apiToken);
                return currentUser;
            });
        }

        /**
         * Sends an http request to retrieve all categories that exists
         * @return    {Promise}    is an object that holds all the categories that exist
         */
        function getAllCategories() {
            return $http({
                method: 'get',
                url: 'https://tiy-blog-api.herokuapp.com/api/Categories',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
                return response.data;
            });
        }

        /**
         * Throw an error if login fails
         * @param  {String} field The invalid input
         * @return {Promise}      A deferred XmlHttpRequest
         *                        object with an error status of 401
         */
        function loginError(field) {
            var err = new Error('You need a ' + field + ' to login!');
                err.status = 401;
                return $q.reject(err);
        }

        function isLoggedIn() {
            return !!apiToken;
        }

        function logOut() {
            apiToken = null;
            currentUser = null;
        }
    }


})();
