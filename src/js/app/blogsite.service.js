(function() {
    'use strict';

    angular.module('blog')
        .factor('blogsite', BlogSiteService);

    BlogSiteService.$inject = ['$http'];

    function BlogSiteService($http) {
        var token;
        // var currentUser;

        return {
            createUser: createUser
            // login: login
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
    }


})();
