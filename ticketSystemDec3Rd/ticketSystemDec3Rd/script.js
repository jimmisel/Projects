"use strict";

//object wrapper to put all our functionality for the app on an object
var ticketingApp = {};

//C.R.U.D. = Create Read Update Delete

// this creates a property array on the ticketApp object using dot notation
ticketingApp.ticketArray = [];

ticketingApp.readTickets = function () {
    var h = "<table class='table'>";
    h += '<tr>';
    h += '<th>Description</th>';
    h += '<th>Priority</th>';
    h += '<th>User Name</th>';
    h += '<th>Time Stamp</th>';
    h += '<th>Edit</th>';
    h += '</tr>';

    this.ticketArray.sort(function(a, b){
        if(a.priority < b.priority){
            return -1;
        }else if(a.priority > b.priority){
            return 1;
        }else{
            return 0;
        }
    });

    for (var index in this.ticketArray) {
        var ticket = this.ticketArray[index];

        h += '<tr>';
        h += '<td>' + ticket.description + '</td>';
        h += '<td>' + ticket.priority + '</td>';
        h += '<td>' + ticket.userName + '</td>';
        h += '<td>' + ticket.timeStamp + '</td>';
        h += '<td><button onClick="ticketingApp.updateTicket(' + index + ')">Edit</button>';
        h += '<button onClick="ticketingApp.deleteTicket(' + index + ')">delete</button></td>';
        h += '</tr>';

    }
    h += '</table>';

    document.getElementById('result').innerHTML = h;
}

ticketingApp.deleteTicket = function (index) {
    if (confirm('Are you sure you want to remove this ticket?')) {
        this.ticketArray.splice(index, 1);

        this.readTickets();
    }
}


ticketingApp.updateTicket = function (index) {
    var ticket = this.ticketArray[index];

    var descInput = document.getElementById('description');
    var priorityInput = document.getElementById('priorty');
    var userName = document.getElementById('userName');
    var ticketIndex = document.getElementById('ticketIndex');

    descInput.value = ticket.description;
    priorityInput.value = ticket.priority;
    userName.value = ticket.userName;
    ticketIndex.value = index;

    var createButton = document.getElementById('createButton');
    var saveButton = document.getElementById('saveButton');

    createButton.setAttribute('class', 'hidden');
    saveButton.removeAttribute('class','hidden');

}

ticketingApp.saveTicket = function () {
    var descInput = document.getElementById('description');
    var priorityInput = document.getElementById('priorty');
    var userName = document.getElementById('userName');
    var ticketIndex = document.getElementById('ticketIndex');

    var ticket = this.ticketArray[ticketIndex.value];

    ticket.description = descInput.value;
    ticket.priorty = priorityInput.value;
    ticket.userName = userName.value;

    createButton.removeAttribute('class', 'hidden');
    saveButton.setAttribute('class', 'hidden');

    descInput.value = '';
    priorityInput.value = "";
    userName.value = '';
    
    this.readTickets();
}



//method - method invocation pattern
ticketingApp.createTicket = function () {
    var descInput = document.getElementById('description');
    var priorityInput = document.getElementById('priorty');
    var userName = document.getElementById('userName');
   

    //var t = {
    //    description: descInput.value,
    //    priority: priorityInput.value,
    //    userName: userName.value,
    //    timeStamp: new Date()
    //};

    var t = new this.Ticket(descInput.value, priorityInput.value, userName.value)

    this.ticketArray.push(t);

    descInput.value = '';
    priorityInput.value = "";
    userName.value = '';
   
    this.readTickets();
}

// object constructor invocation patteren
ticketingApp.Ticket = function (description, priority, userName) {
    this.description = description;
    this.priority = priority;
    this.userName = userName;
    this.timeStamp = new Date();

}

