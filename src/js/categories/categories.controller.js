(function () {
    'use strict';

    angular.module('blog')
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['blogsite'];

    function CategoriesController(blogsite) {
        this.categories = blogsite.getAllCategories;
    }


})();
