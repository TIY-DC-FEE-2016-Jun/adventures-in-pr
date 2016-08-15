(function(){
    'use strict';

    angular.module('blog')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$state', 'blogsite'];

    function IndexController($state, blogsite) {
        var that = this;
        this.categories = [];
        this.goToCategory = goToCategory;


        function goToCategory(id) {
            $state.go('category', {'categoryId': id});
        }

        blogsite.getAllCategories()
            .then(function(data) {
                that.categories = data;
            })
            .catch(function(error) {
                that.categories = [{name: 'no category list exists'}];
                console.error(error);
            });

        this.currentDate = Date.now();


        this.getMonths = blogsite.getPastThreeMonths(this.currentDate);
        console.log(this.getMonths);

        this.goToMonth = function goToMonth(selMonth, indexNum) {
            $state.go('recentPosts', {
                'month': selMonth,
                'chosenMonth': selMonth,
                'allDates': angular.toJson(that.getMonths),
                'dateIndex': indexNum
            });
        };
    }

})();
