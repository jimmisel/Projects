var app = angular.module('chatApp', ['angularMoment']);

app.controller('messageController', function ($scope, chatServices) {
    chatServices.getMessages().then(function (data) {
        $scope.chatArray = data;
    }, function (response) {
        console.log('there was an error. This is what is says:' + response)
    });

    $scope.addMessage = function () {
        chatServices.addMessage($scope.message);
        message = '';
    };
    var timeSent = '-timestamp';
    //might not even add the delete yet for chat messages
    $scope.deleteMessage = function () { };
});



app.factory('chatServices', function ($http, $q) {
    var chatArray = [];

    var getMessages = function () {

        var deferred = $q.defer();

        $http({
            url: 'https://hccsport.firebaseio.com/chat/.json',
            method: 'GET'
        }).success(function (data) {

            chatArray.length = 0;
            for (var chatId in data) {
                var chatid = data[chatId]
                chatid.id = chatId;
                chatArray.push(chatid);
               
            }
            
            deferred.resolve(chatArray);
        }).error(function () {
            deferred.reject();
        });

        return deferred.promise;
    };



    var addMessage = function (message) {
        var m = {
            message: message,
            timestamp: new Date(),
            user: 'Jim'
        }

        $http.post('https://hccsport.firebaseio.com/chat/.json', m).success(function () {
            chatArray.push(m);
        }, function () {
            //add the error message here
        });

    };
    var deleteMessage = function () { };

    return  {
        getMessages: getMessages,
        addMessage: addMessage,
        deleteMessage: deleteMessage
    }
});




//Routing day 13