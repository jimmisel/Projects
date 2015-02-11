app.factory('messageService', function ($http, $q) {
    var chatArray = [];
    var addMessage = function (name, message) {
        var m = {
            name: name,
            message: message
        }
        chatArray.push(m);
    };
    var removeMessage = function (msgObj) {
        chatArray.splice(chatArray.indexOf(msgObj), 1);
    };
    var getMessages = function () {

        if (chatArray.length) {
            callback(chatArray);
            return;
        }
        //promise
        var deferred = $q.defer();


        $http({
            url: '',
            method: 'GET',
        }).success(function (data) {
            chatArray.length = 0;
            for (var m in data) {
                chatArray.push(data[chatId]);
            }
            // callback(chatArray);
            deferred.resolve(chatArray);
        }).error(function () {
            deferred.reject();
        });
        //promise
        return deferred.promise;

    }
    //var getMessages = function () {
    //    return chatArray;
    //}
    loadMessages();

    return {
        addMessage: addMessage,
        removeMessage: removeMessage,
        getMessages: getMessages
    };
});