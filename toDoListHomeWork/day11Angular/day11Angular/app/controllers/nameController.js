

app.controller('nameController', function ($scope, messageService) {
    $scope.chatArray = messageService.getMessages();

});