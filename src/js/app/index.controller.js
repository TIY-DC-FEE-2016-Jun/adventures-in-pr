(function(){
    'use strict';

    angular.module('blog')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['blogsite'];

    function IndexController(blogsite) {
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

        this.currentDate = Date.now();

        this.getPastMonths = function getPastMonths(numMonthsBack) {
            var oneMonth = 2629746000;

            return that.currentDate - (oneMonth * numMonthsBack);
        };
    }

})();
