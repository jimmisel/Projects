var messageApp = {};
messageApp.messageArray = [];

messageApp.messages = function () {
    var request = new XMLHttpRequest();
    request.open('GET', "https://jimstodolist.firebaseio.com/.json", false);
    request.onload = function () {
        //good statuses
        if (this.status >= "200" && this.status < "400") {
            var data = JSON.parse(this.response);
            //this clears the array
            messageApp.messageArray.length = 0;

            for (var m in data) {
                var message = data[m];
                message.id = m;
                messageApp.messageArray.push(message);

            }

            messageApp.displayTable();
        } else {
            document.getElementById('result').innerHTML = 'An error occured';
        }



    }
    request.send();
}

//request.onerror = function () {
//    //500 error messages
//}


messageApp.displayTable = function (data) {
    var h = "<table>";
    h += "<tr>";
    h += "<th>Name</th>";
    h += "<th>Text</th>";
    h += "<th>Time</th>";
    h += "</tr>";

    for (var m in this.messageArray) {
        var message = this.messageArray[m];
        h += "<tr>";
        h += '<td>' + message.name + '</td>';
        h += '<td>' + message.text + '</td>';
        h += '<td>' + message.time + '</td>';
        h += "</tr>";

    }

    h += "</table>";
    document.getElementById('result').innerHTML = h;
}

messageApp.createMessage = function () {
    var nameInput = document.getElementById("name");
    var textInput = document.getElementById("text");

    var newMessage = {
        name: nameInput.value,
        text: textInput,
        time: new Date()
    };


    var request = new XMLHttpRequest();
    request.open('POST', "https://jimstodolist.firebaseio.com/.json", false);
    request.onload = function () {
        if (this.status >= "200" && this.status < "400") {

            messageApp.messageArray.push(newMessage);
            messageApp.displayTable();
           // messageApp.messages();

            nameInput.value = '';
            textInput.value = '';

        } else {
            alret('something went wrong');
        }
    }


    request.send(JSON.stringify(newMessage));

}

messageApp.deleteMessage = function () {
    var deleteInput = document.getElementById('delete');
    var index = deleteInput.value;

    var message = this.messageArray[index];

    var request = new XMLHttpRequest();
    request.open('DELETE', "https://jimstodolist.firebaseio.com/.json"+messageArray.id+ ".json", false);
    request.onload = function () {
        if (this.status == "200") {
            this.messageApp.messageArray.splice(index, 1);
            messageApp.displayTable();
        }
    }

    deleteInput.value = "";
    request.send();
}


messageApp.messages();