(function() {
    'use strict';

    var EMAIL_REGEX = /[^@\s]+@.+\..+/;

    angular.module('blog')
        .factory('blogsite', BlogSiteService);

    BlogSiteService.$inject = ['$http', '$q'];

    function BlogSiteService($http, $q) {
        var apiToken;
        var currentUser;

        init();

        return {
            getLoggedInAuthor: getLoggedInAuthor,
            getAuthor: getAuthor,
            createUser: createUser,
            login: login,
            isLoggedIn: isLoggedIn,
            logOut: logOut,
            getAllCategories: getAllCategories,
            getCategory: getCategory,
            submitBlogPost: submitBlogPost,
            getAllBlogs: getAllBlogs,
            deleteBlogPost: deleteBlogPost,
            getPost: getPost,
            getPostByDate: getPostByDate,
            getPastThreeMonths: getPastThreeMonths
        };


        /**
         * If user has logged in previously, this function will retrieve
         * user data from local storage and save the token.
         * @return {void}
         */
        function init() {
            try {
                currentUser = JSON.parse(localStorage.getItem('currentUser'));
            } catch(err) {
                //does not matter if loggedInUser does not exist or is invalid
                //because user will just log in with form
            }

            if (currentUser) {
                apiToken = currentUser.userToken;
            }
        }

        /**
         * Returns the currentAuthor
         * @return  {Object}     the currentUser's info
         */
        function getLoggedInAuthor() {
            return $http({
                url: 'https://tiy-blog-api.herokuapp.com/api/Authors/' + currentUser.userId,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apiToken
                },
            })
            .then(function(response) {
                return response.data;
            });
        }

        /**
         * Returns the author of the given id
         * @param  {String}     authorId    Unique string to identify author
         * @return {Object}                 Author's information for the given id
         */
        function getAuthor(authorId) {
            return $http({
                url: 'https://tiy-blog-api.herokuapp.com/api/Authors/' + authorId,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apiToken
                },
            })
            .then(function(response) {
                return response.data;
            });
        }

        /**
         * Logged in user can create new user
         * @param  {String}  name     Name of new user
         * @param  {String}  email    Email of new user
         * @param  {String}  password Password with 1 special char and min 8 char long
         * @return {Promise}          XMLHttpRequest object that implements promise methods
         */
        function createUser(name, email, password) {
            if (typeof( name ) !== 'string' || !name.length ) {
                return inputError('Please enter a valid name.');
            } else if (
                    typeof( email ) !== 'string' ||
                    !EMAIL_REGEX.test(email)
                ){
                return inputError('Please enter a valid email.');
            } else if (
                    typeof( password ) !== 'string' ||
                    password.length < 8
                ) {
                return inputError('Please enter a valid password.');
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
            if (typeof( email ) !== 'string' ||
                !EMAIL_REGEX.test(email)) {
                return inputError('Please enter a valid email address.');
            } else if (
                typeof( password ) !== 'string' ||
                password.length < 8) {
                return inputError('Please enter a valid password.');
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
                        userEmail: email,
                        userId: currentUser.userId
                    }));
                return currentUser;
            });
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
         * Return an error if login fails
         * @param  {String} message The message to be displayed to user
         * @return {Promise}        Rejected Promise with object with an error
         *                          status of 400 and the specified message
         */
        function inputError(message) {
            var err = new Error(message);
            err.status = 400;
            return $q.reject(err);
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
                console.log(response.data);
                return response.data;
            });
        }

        /**
         * Retrieves a category name from the given categoryId
         * @param  {String}     categoryId   the given category id
         * @return {String}                  category name
         */
        function getCategory(categoryId) {
            if(!categoryId) {
                return $q.reject(new Error('can\'t get category without category id'));
            }
            return $http({
                method: 'get',
                url: 'https://tiy-blog-api.herokuapp.com/api/Categories/' + categoryId,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    'filter': {
                        'include': 'posts'
                    }
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
                return $q.reject(new Error('blogpost is empty'));
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
            .then(function(response) {
                console.log(response.data);
                return response.data;
            });
        }

        /**
         * Retrieves all blog posts that exist in database
         * @return {Promise}    an XHR object that can implement promise methods
         */
        function getAllBlogs() {
            return $http({
                method: 'get',
                url: 'https://tiy-blog-api.herokuapp.com/api/Posts/',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
                console.log(response);
                return updateBlogs(response.data);
            });
        }

        /**
         * Updates all individual blogs with another property inside of a blogs Array
         * @return {Array}  updated each blog in array to include category and author name
         */
        function updateBlogs(blogs) {
            if(!blogs || !(blogs instanceof Array)) {
                return;
            }
            blogs.forEach(function(blog) {
                getCategory(blog.categoryId)
                    .then(function(category) {
                        blog.category = category.name;
                    });
                getAuthor(blog.authorId)
                    .then(function(author) {
                        blog.authorName = author.name;
                    });
            });
            console.log('updateBlogs function', blogs);
            return blogs;
        }

        /**
         * deletes selected post by calling the api's delete method with the given id
         * @param  {String}     postId      Id of selected blog post
         * @return {Promise}    an XHR object that can implement promise methods
         */
        function deleteBlogPost(postId) {
            if (!postId) {
                return $q.reject(new Error('can\'t delete a post without it\'s id'));
            }
            return $http({
                method: 'delete',
                url: 'https://tiy-blog-api.herokuapp.com/api/Posts/' + postId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apiToken
                }
            });
        }

        /**
         * Retrieve a single blog post
         * @param  {String}     postId Id of selected blog post
         * @return {Promise}    XMLHttpRequest object that implements promise methods
         */
        function getPost(postId) {
            if(!postId) {
                return $q.reject(new Error('can\'t retrieve a blog post without post id'));
            }
            return $http({
                method: 'get',
                url: 'https://tiy-blog-api.herokuapp.com/api/Posts/' + postId,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    'filter': {
                        'include': ['author','category']
                    }
                }
            });
        }

        /**
         * Get older or newer posts with a limit on how many posts are returned
         * @param  {Number} limitNum  Limit parameter of how many posts are retrieved
         * @param  {Number} offsetNum Offset parameter of which posts are retrieved
         * @return {Promise}          XMLHttpRequest object that implements promise methods
         */
        function getPostByDate(limitNum, offsetNum) {
            return $http({
                method: 'get',
                url: 'https://tiy-blog-api.herokuapp.com/api/Posts/',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    'filter': {
                        'limit': limitNum,
                        'offset': offsetNum
                    }
                }
            });
        }

        function getPastThreeMonths(currentDate) {
            var dateObjects = [];
            var oneMonth = 2629746000;

            dateObjects.push(currentDate);

            var lastMonth = currentDate - oneMonth;
            dateObjects.push(lastMonth);

            var twoMonthsAgo = currentDate - (oneMonth * 2);
            dateObjects.push(twoMonthsAgo);

            return dateObjects;
        }

    }

})();
