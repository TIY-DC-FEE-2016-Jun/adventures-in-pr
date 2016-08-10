(function() {
    'use strict';

    angular.module('blog', ['ui.router'])
        .config(blogConfig);

    blogConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function blogConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/js/app/home.template.html'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/js/app/aboutUs.template.html'
            })
            .state('createPost', {
                url: '/create-post',
                templateUrl: '/js/posts/createPost.template.html'
            })
            .state('recentPosts', {
                url: '/recent',
                templateUrl: '/js/posts/recentPosts.template.html'
            })
            .state('createUser', {
                url: '/create-user',
                templateUrl: '/js/acctManagement/createUser.template.html',
                controller: 'CreateUserController',
                controllerAs: 'createUser'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/js/acctManagement/login.template.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl',
            })
            .state('category', {
                url: '/category',
                templateUrl: '/js/categories/category.template.html'
            });
    }

})();
