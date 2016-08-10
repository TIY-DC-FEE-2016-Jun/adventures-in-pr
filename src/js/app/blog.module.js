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
                templateUrl: '/js/app/home.template.html',
                controller: 'HomeController',
                controllerAs: 'homeCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/js/app/aboutUs.template.html'
            })
            .state('createPost', {
                url: '/create-post',
                templateUrl: '/js/posts/createPost.template.html',
                controller: 'CreatePostController',
                controllerAs: 'cpCtrl'
            })
            .state('recentPosts', {
                url: '/recent',
                templateUrl: '/js/posts/recentPosts.template.html'
            })
            .state('createUser', {
                url: '/create-user',
                templateUrl: '/js/acctManagement/createUser.template.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/js/acctManagement/login.template.html'
            })
            .state('category', {
                url: '/category',
                templateUrl: '/js/categories/category.template.html',
                controller: 'CategoriesController',
                controllerAs: 'catCtrl'
            });
    }

})();
