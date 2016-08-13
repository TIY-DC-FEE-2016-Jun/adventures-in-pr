(function() {
    'use strict';

    angular.module('blog', ['ui.router'])
        .config(blogConfig)
        .run(ghStartup);

    blogConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function blogConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/js/app/home.template.html',
                controller: 'HomeController',
                controllerAs: 'homeCtrl',
                params: {
                    posts: null
                }
            })
            .state('about', {
                url: '/about',
                templateUrl: '/js/app/aboutUs.template.html'
            })
            .state('createPost', {
                url: '/create-post',
                templateUrl: '/js/posts/createPost.template.html',
                controller: 'CreatePostController',
                controllerAs: 'cpCtrl',
                secure: true
            })
            .state('recentPosts', {
                url: '/recent',
                templateUrl: '/js/posts/recentPosts.template.html'
            })
            .state('createUser', {
                url: '/create-user',
                templateUrl: '/js/acctManagement/createUser.template.html',
                controller: 'CreateUserController',
                controllerAs: 'createUserCtrl',
                secure: true
            })
            .state('login', {
                url: '/login',
                templateUrl: '/js/acctManagement/login.template.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl',
                params: {
                    message: null
                }
            })
            .state('category', {
                url: '/category',
                templateUrl: '/js/categories/category.template.html',
                controller: 'CategoriesController',
                controllerAs: 'catCtrl'
            })
            .state('404', {
                url: '/404',
                templateUrl: '/js/app/404.template.html'
            });
    }

    ghStartup.$inject = ['$rootScope', '$state', 'blogsite'];

    function ghStartup($rootScope, $state, blogsite) {
        $rootScope.$on('$stateChangeStart', function(e, toState) {
            if (toState.secure && !blogsite.isLoggedIn()) {
                e.preventDefault();
                console.log('not logged in');

                $state.go('login', {
                    message: 'You must log in first!'
                });
            }
        });
    }

})();
