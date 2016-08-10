(function(){
    'use strict';

    angular.module('blog')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['blogsite'];

    function HomeController(blogsite) {
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
