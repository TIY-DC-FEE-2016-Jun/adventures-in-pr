(function() {
    'use strict';

    angular.module('blog')
        .factory('blogsite', BlogSiteService);

    BlogSiteService.$inject = ['$http', '$q'];

    function BlogSiteService($http, $q) {
        var apiToken;
        var currentUser;

        init();

        return {
            createUser: createUser,
            login: login,
            isLoggedIn: isLoggedIn,
            logOut: logOut,
            getAllCategories: getAllCategories,
            submitBlogPost: submitBlogPost
        };

        /**
         * If user has logged in previously, this function will retrieve
         * user data from local storage and save the token.
         * @return {void}
         */
        function init() {
            var loggedInUser = null;

            try {
                loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
            } catch(err) {
                //does not matter if loggedInUser does not exist or is invalid
                //because user will just log in with form
            }

            if (loggedInUser) {
                apiToken = loggedInUser.userToken;
            }
        }

        /**
         * Logged in user can create new user
         * @param  {String} name     Name of new user
         * @param  {String} email    Email of new user
         * @param  {String} password Password with 1 special char and min 8 char long
         * @return {Promise}         XMLHttpRequest object that implements promise methods
         */
        function createUser(name, email, password) {
            if (!name || !email || !password) {
                return null;
            } else if (password.length < 8) {
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
         * Log in to blog site and store user info in local storage.
         * @param  {String} email    Email of user
         * @param  {String} password Password of user
         * @return {Promise}         XMLHttpRequest object that can implement
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
                localStorage
                    .setItem('currentUser', angular.toJson({
                        userToken: apiToken,
                        userEmail: email
                    }));
                return currentUser;
            });
        }


        /**
         * Return an error if login fails
         * @param  {String} field The invalid input
         * @return {Promise}      A deferred XMLHttpRequest
         *                        object with an error status of 401
         */
        function loginError(field) {
            var err = new Error('You need a ' + field + ' to login!');
                err.status = 401;
                return $q.reject(err);
        }

        /**
         * Is the user logged in or not
         * @return {Boolean}    If apiToken exists, then fn will return true.
         */
        function isLoggedIn() {
            return !!apiToken;
        }

        /**
         * Log out user from the app by forgetting token and user data.
         * Removes logged in user data from local storage.
         * @return {void}
         */
        function logOut() {
            apiToken = null;
            currentUser = null;
            localStorage.removeItem('currentUser');
        }

        /**
         * Sends an http request to retrieve all categories that exists
         * @return    {Promise}    an XHR object that can implement promise methods
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
         * Sends an http request post a created blogpost
         * @return    {Promise}    an XHR object that can implement promise methods
         */
        function submitBlogPost(blogPost) {
            if (!blogPost) {
                console.log('no blog post, unable cannot post anything');
            }
            return $http({
                method: 'post',
                url: 'https://tiy-blog-api.herokuapp.com/api/Posts',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apiToken
                },
                data: angular.toJson(blogPost)
            })
            .then(function(data) {
                console.log(data);
            });
        }

    }

})();
