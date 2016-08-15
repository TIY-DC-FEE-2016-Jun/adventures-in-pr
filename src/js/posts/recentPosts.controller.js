// (function() {
//     'use strict';
//
//     angular.module('blog')
//         .controller('RecentPostsController', RecentPostsController);
//
//     RecentPostsController.$inject = ['$stateParams', 'blogsite'];
//
//     function RecentPostsController($stateParams, blogsite) {
//         var that = this;
//
//         this.monthName = $stateParams.chosenMonth;
//         this.allDates = JSON.parse($stateParams.allDates);
//         this.dateIndex = $stateParams.dateIndex;
//
//         this.selMonth = new Date(this.allDates[this.dateIndex]).getMonth();
//
//         this.monthlyBlogs = [];
//         this.getMonthlyBlogs = function getMonthlyBlogs() {
//             blogsite.getAllBlogs()
//                 .then(function(blogs) {
//                     console.log('all blogs', blogs);
//
//                     for (var i=0; i<(blogs.data.length - 1); i++) {
//                         var month = new Date(blogs[i].date).getMonth();
//                         if ( month === that.selMonth ) {
//                             that.monthlyBlogs.push(blogs[i]);
//                         }
//                     }
//                     console.log(that.monthBlogs);
//                 });
//
//         };
//
//     }
// })();
