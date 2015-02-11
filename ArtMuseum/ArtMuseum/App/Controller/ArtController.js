app.controller("ngHomeController", ['$scope','ArtServices',function ($scope, ArtServices) {
    //$routeParams,
//only the stuff that goes to the views goes in here
    var artist = [];
    
    //make the first get function to call from the service for the list of artist
    ArtServices.getArtist().then(function (data) {
        $scope.artist = data;
    }),function (responce) {//do something with the error message 
    };

    


   

}]);