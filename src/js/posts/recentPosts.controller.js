(function() {
    'use strict';

    angular.module('blog')
        .controller('RecentPostsController', RecentPostsController);

    RecentPostsController.$inject = ['$stateParams'];

    function RecentPostsController($stateParams) {
        this.monthName = $stateParams.chosenMonth;
        this.allDates = JSON.parse($stateParams.allDates);
        this.dateIndex = $stateParams.dateIndex;

        this.currentDate = this.allDates[this.dateIndex];
        console.log(this.currentDate);


    }
})();
