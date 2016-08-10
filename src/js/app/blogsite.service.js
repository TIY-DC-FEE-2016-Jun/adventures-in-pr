(function() {
    'use strict';

    angular.module('blog')
        .factory('blogsite', BlogSiteService);

    BlogSiteService.$inject = ['$http'];

    function BlogSiteService($http) {
        var token;
        // var currentUser;

        return {
            createUser: createUser,
            // login: login
            getAllCategories: getAllCategories
        };


        function createUser(name, email, password) {
            if (!name || !email || !password) {
                return null;
            }

            return $http({
                url: 'https://tiy-blog-api.herokuapp.com/api',
                method: 'post',
                dataType: 'json',
                headers: {
                    'content-type': 'application/json'
                },
                data: {
                    'name': 'Stacy',
                    'email': 'stacy@theironyard.com',
                    'password': 'password'
                }
            })
            .then(function(userData) {
                token = userData.id;
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

    }


})();
