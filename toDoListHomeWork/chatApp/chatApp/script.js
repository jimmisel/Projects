//user, timestamp, message these names for the object
//firebase url === https://hccsport.firebaseio.com/chat/.json

var chatApp = {};
chatApp.messages = [];
var baseUrl = "hccsport";
chatApp.urlMaker = function (base) {
    var url = "https://" + base + ".firebaseio.com/chat/"
    for (var i = 1; i < arguments.length; i++) {
        url += arguments[i];
    }
    return url + ".json";
}
chatApp.fireCalls = function (verb,url,data,success) {
    var request = new XMLHttpRequest();
    request.open(verb, url);
    request.onload = function () {
        if (this.status >= '200' && this.status < '400') {
            if (success && typeof (success) == 'function') {
                var data = JSON.parse(this.response);
                success(data);
                }
        } else {
            document.getElementById('showMessage').innerHTML = "Something went wrong check your code and try again";
        }
    }
    if (verb === 'GET' || verb ==='DELETE') {
        request.send();
    } else {
        request.send(JSON.stringify(data));
    }
}
chatApp.getMessages = function () {
    chatApp.fireCalls('GET', chatApp.urlMaker(baseUrl), null, function (data) {
        chatApp.messages.length = 0;
        for (var m in data) {
              var message = data[m];
              message.id = m;
              chatApp.messages.push(message);
             };
       chatApp.showMessage();
    });
}
chatApp.createMessage = function () {
    var that = this;
    var message = document.getElementById('message');
    var t = new this.Message(message.value);
    chatApp.fireCalls('Post', chatApp.urlMaker(baseUrl), t, function (data) {
                that.messages.push(t);
                t.id = data.name;
                message.value = "";
                chatApp.showMessage();

    });

}
chatApp.deleteMessage = function (index) {
    var message = this.messages[index];
    chatApp.fireCalls('DELETE', chatApp.urlMaker(baseUrl,message.id), null, function () {
        chatApp.messages.splice(index, 1);
        chatApp.showMessage();
    });
}
chatApp.showMessage = function(){
    var h = "<table class='table table-striped'>";
    h += '<tr>';
    h += '</tr>';
    //set the length to cut off of the array
    var howLong = chatApp.messages.length - 5;  
    //changes the order so the last message is shown first
    chatApp.messages.reverse();
    //cuts the array so that only the first 5 messages show these were the last 5
    chatApp.messages.splice(5, howLong)
    for (var index in this.messages) {
        var message = this.messages[index];
        h += '<tr>';
        h += '<td>' +message.user + '</td>';
        h += '<td>' + message.message + '</td>';
        if (message.user === 'Jim') {
            h += "<td><input type='button' onclick='chatApp.deleteMessage(" + index + ")' value='Delete' ></button></td>"
        }
        h += '</tr>';
    }
    h += '<tr></tr>';
    h += '</tbody>';
    h += '</table>';
    return document.getElementById('showMessage').innerHTML = h;
}
chatApp.Message = function (message) {
    this.message = message;
    this.user = "Jim";
    this.timestamp = new Date();
}
setInterval(chatApp.getMessages, 2000);
//chatApp.getMessages();





