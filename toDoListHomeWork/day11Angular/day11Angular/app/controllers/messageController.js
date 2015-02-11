app.controller('IndexController', function ($scope, messageService) {
    //part of the promise system
    messageService.getMessages().then(function (data) {
        $scope.chatArray = data;
        //this is the deferred.resolve(); function
    }, function () {
        //Error goes here deferred.reject();
    });



    $scope.addMessage = function () {
        messageService.addMessage($scope.name, $scope.message);

    };
    $scope.name = '';
    $scope.message = "";
    $scope.removeMessage = function (message) {
        messageService.removeMessage(message);
    };


});