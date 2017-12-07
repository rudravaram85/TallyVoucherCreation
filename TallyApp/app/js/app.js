'use strict'

angular.module('TallyApp',['ui.router','TallyApp.controllers','TallyApp.directives','TallyApp.filters','TallyApp.services']);

angular.module('TallyApp').config(['$httpProvider','$locationProvider',function($httpProvider,$locationProvider){
    
  



    	$locationProvider.html5Mode(true);


}]);

