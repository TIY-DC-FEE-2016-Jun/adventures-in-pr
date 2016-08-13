(function() {
    'use strict';

    angular.module('blog')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['blogsite'];

    function HomeController(blogsite) {
        
    }


})();
