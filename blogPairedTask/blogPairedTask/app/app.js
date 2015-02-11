var app = angular.module('blogApp', ['ngRoute', 'angularMoment']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/app/views/home.html',
        controller: 'BlogController'
    }).when('/new', {
        templateUrl: "/app/views/newPost.html",
        controller: 'BlogController'
    }).when('/edit/:id', {
        templateUrl: '/app/views/editPost.html',
        controller: 'BlogController'
    }).when('/view/:id', {
        templateUrl: '/app/views/viewPost.html',
        controller: 'BlogController'
    }).otherwise({
        redirectTo: '/'
    })
}]);