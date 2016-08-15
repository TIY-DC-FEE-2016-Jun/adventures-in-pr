(function(){
    'use strict';

    angular.module('blog')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$state', 'blogsite'];

    function IndexController($state, blogsite) {
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

        this.goToMonth = function goToMonth(selMonth) {
            $state.go('recentPosts', {'month': selMonth});
        };
    }

})();
