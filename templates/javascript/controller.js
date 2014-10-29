'use strict';
var <%= moduleNamePascalCase %> = angular.module('<%= moduleNamePascalCase %>');


/**
 * @ngdoc function
 * @name <%= scriptAppName %>.<%= moduleNamePascalCase %>.controller:<%= classedName %>Ctrl
 * @description
 * # <%= classedName %>Ctrl
 * Controller of the <%= moduleNamePascalCase %> module.
 */
<%= moduleNamePascalCase %>.controller('<%= classedName %>Ctrl', function($scope) {

    $scope.title = 'APSL Generated Controller';
});
