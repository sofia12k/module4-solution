(function () {
  'use strict';
  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.template.html'
      })

      .state('categories', {
        url: '/categories',
        template: '<categories items="$ctrl.items"></categories>',
        controller: 'CategoriesController as $ctrl',
        resolve: {
          items: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories()
              .then(function (response) {
                return response.data;
              });
          }]
        }
      })

      .state('items', {
        url: '/items/{categoryShortName}',
        template: '<items items="$ctrl.items"></items>',
        controller: 'ItemsController as $ctrl',
        resolve: {
          items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
                .then(function (response) {
                  return response.data.menu_items;
                });
            }]
        }
      });
  }
})();
