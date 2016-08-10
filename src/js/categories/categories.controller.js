(function () {
    'use strict';

    angular.module('blog')
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['blogsite'];

    function CategoriesController(blogsite) {
        var that = this;
        this.categories = [];

        blogsite.getAllCategories()
            .then(function(data) {
                that.categories = data;
            })
            .catch(function(error) {
                that.categories = [{name: 'no category list exists'}];
                console.error(error);
            });


    }


})();
