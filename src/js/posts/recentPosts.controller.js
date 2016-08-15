(function() {
    'use strict';

    angular.module('blog')
        .controller('RecentPostsController', RecentPostsController);

    RecentPostsController.$inject = ['$stateParams'];

    function RecentPostsController($stateParams) {
        this.monthName = $stateParams.chosenMonth;


    }
})();
