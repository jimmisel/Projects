var app = angular.module('myApp',['ngRoute']);

app.config(['$routeProvider',function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/app/views/homeView.html',
        controller: 'HomeController'
    }).when('/profile', {
        templateUrl: "/app/views/profileView.html",
        controller:'ProfileController'
    }).when('/contact', {
        templateUrl: '/app/views/contactView.html',
        controller:'ContactController'
    }).otherwise({
        redirectTo:'/'
    })
}]);