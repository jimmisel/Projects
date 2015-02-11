'use strict';
// create a todo list app 



var myTask = {};

myTask.taskArray = [];
myTask.completeArray = [];

//load messages when the page loads for the first time
myTask.getTasks = function () {
    var request = new XMLHttpRequest();
    request.open("GET", 'https://jimstodolist.firebaseio.com/.json', false);
    request.onload = function () {
        //Good statuses
        if (this.status >= "200" && this.status < "400") {
            var data = JSON.parse(this.response);

            //Clear everything in the array
            // myTask.taskArray.length = 0;

            for (var m in data) {
                var message = data[m];
                message.id = m;
                myTask.taskArray.push(message);
                //console.log(m);
            };

            myTask.readTask();
        }
        else {
            document.getElementById('theList').innerHTML = "Some error occured";
        };

        
    };
    request.send();
};



    // this is to show the task on the screen and builds the table
myTask.readTask = function () {

    var h = "<table class='table table-bordered table-striped'>";
    h += '<tr><tbody>';
    h += '<th>Description</th>';
    h += '<th>Priority</th>';
    h += '<th>Time Stamp</th>';
    h += '<th>Complete</th>';
    h += '<th>Completed Time</th>';
    
    h += '</tr>';
    //sorts by priorty
    this.taskArray.sort(function (a, b) {
        if (a.priority < b.priority) {
            return -1;
        } else if (a.priority > b.priority) {
            return 1;
        } else {
            return 0;
        }
    });
    //sorts by done. if done moves to the bottom
    this.taskArray.sort(function (c, d) {
        if (c.done > d.done) {
            return -1;
        } else if (c.done < d.done) {
            return 1;
        } else {
            return 0;
        }
    });
    //displays all task in the array
    for (var index in this.taskArray) {
        var task = this.taskArray[index];

        h += '<tr>';
        h += '<td>' + task.description + '</td>';
        h += '<td>' + task.priority + '</td>';
        h += '<td>' + task.timeStamp + '</td>';
        h += '<td>' + task.done + '</td>';
        //checks to see if there is a 2nd timeStamp if there is it displays it to the page
        if (task.timeStamp2 === undefined) {
            h += '<td><button class="btn btn-default" onClick="myTask.markComplete(' + index + ')" id="btnDone' + index + '">Mark Complete</button></td>';
        } else {
            h += '<td>' + task.timeStamp2 + '<br /><button class="btn btn-default" id="clear" onclick="myTask.clearTask(' + index + ')">Clear</button></td>';

        };
        
        h += '</tr>';
    } h += '<tr></tr>';
    h += '</tbody>';
    h += '</table>';
    h += '<button class="btn btn-default" id="clear" onclick="myTask.clearAllTask()">Clear All</button>';
    return document.getElementById('theList').innerHTML = h;
    }

//use C. R. U. D. - Create Read Update Delete
// this will let you mark the task as complete



myTask.markComplete = function (index) {
    var complete = this.taskArray[index];
    // pushing the ones that are done to the array
   this.completeArray.push(index);
        //marks the task as done on the page
        complete.done = "Yes";
        //sets the time for when it was marked as done
        complete.timeStamp2 = myTask.fixTime();
        

        var request = new XMLHttpRequest();
        request.open("PATCH", 'https://jimstodolist.firebaseio.com/' + complete.id + '.json', false);
        request.onload = function () {
            //Good statuses
            
            if (this.status == "200") {
                var data = JSON.parse(this.response);
                complete.id = data.name;
                 
                //complete.timeStamp2 = myTask.fixTime();

            } else {
                console.log('Something went wrong');
            }
        }
        
        request.send(JSON.stringify(complete));
        // this updates the table once the info is entered
        this.readTask();
}

// this will let you clear your task one at a time
myTask.clearTask = function (index) {
    //sets the complete on in the var
    var complete = this.taskArray[index];
    
 
        var task = myTask.taskArray[index];

        var request = new XMLHttpRequest();
        request.open('DELETE', 'https://jimstodolist.firebaseio.com/' + task.id + '.json', false);
        request.onload = function () {
            if (this.status == "200") {
                myTask.taskArray.splice(index, 1);
                myTask.readTask();
            } else {
                console.log(this.status);
                console.log(this.response);
            }
        }

        request.send();
    //deletes just one from the index passed in when called
        if (complete.done === "Yes") {

            this.taskArray.splice(index, 1);
        }

        // this updates the table once the info is entered
        //this.readTask();
}


//this is to clear all at once instead of just one at a time
myTask.clearAllTask = function () {
    //run though the completed array first
    for (var i = 0; i < this.completeArray.length; i++) {
        //now check to see what ones here are marked as done
        for (var ii = 0; ii < myTask.taskArray.length; ii++) {
            //if they are marked done delete from the main array
            if (myTask.taskArray[ii].done === "Yes") {

                var task = myTask.taskArray[ii];

                var request = new XMLHttpRequest();
                request.open('DELETE', 'https://jimstodolist.firebaseio.com/' + task.id + '.json', false);
                request.onload = function () {
                    if (this.status == "200") {
                        myTask.taskArray.splice(ii, 1);
                        myTask.readTask();
                    } else {
                        console.log(this.status);
                        console.log(this.response);
                    }
                }

                request.send();
                myTask.taskArray.splice(ii, 1);
            }
        }
    };
    this.readTask();

}


    // this will add the task to the array and clear the input feilds
    myTask.addTask = function () {

        //calls the info from the html
        var descriptionInput =  document.getElementById('description');
        var priorityInput = document.getElementById('priority');

        //calls the function to make the task
        var t = new this.Task(descriptionInput.value, priorityInput.value);

        //pushes into the array
      

        //clears the html input feilds
        descriptionInput.value = "";
        priorityInput.value = "";

        //send to firebase
        //opens the request
        var request = new XMLHttpRequest();
        //tells where to go and what to do 
        request.open("POST", 'https://jimstodolist.firebaseio.com/.json', false); 
        //what to do once you get the data from the server
        request.onload = function () {
            //if the data is good
            if (this.status >= "200" && this.status < "400") {
                //store it in the data var
                var data = JSON.parse(this.response);
                //this is the id
                t.id = data.name;
                //push into the array
                myTask.taskArray.push(t);
                //display the data to the page
               myTask.readTask();
               


            }
            else {
                alert('Something failed!');
            }

        }


        request.send(JSON.stringify(t));

        
    }

    //function to create the task
    myTask.Task = function (description, priority) {
        this.description = description;
        this.priority = priority;
        this.timeStamp = myTask.fixTime();
        this.timeStamp2;
        this.done = "no";
     
    }
    myTask.fixTime = function () {
        // gets the time and converts it to a normal person readable time
        var t = new Date();
        var hours = t.getHours();
        var minutes = t.getMinutes();
        var seconds = t.getSeconds();
        //checks to see what time is stored in hours and converts to 12hr time instead of 24 also adds pm if needed
        var amOrPm = "Am";
        if (hours === 13) {
            hours = 1;
            amOrPm = "Pm";
        } else if (hours === 14) {
            hours = 2;
            amOrPm = "Pm";
        } else if (hours === 15) {
            hours = 3;
            amOrPm = "Pm";
        } else if (hours === 16) {
            hours = 4;
            amOrPm = "Pm";
        } else if (hours === 17) {
            hours = 5;
            amOrPm = "Pm";
        } else if (hours === 18) {
            hours = 6;
            amOrPm = "Pm";
        } else if (hours === 19) {
            hours = 7;
            amOrPm = "Pm";
        } else if (hours === 20) {
            hours = 8;
            amOrPm = "Pm";
        } else if (hours === 21) {
            hours = 9;
            amOrPm = "Pm";
        } else if (hours === 22) {
            hours = 10;
            amOrPm = "Pm";
        } else if (hours === 23) {
            hours = 11;
            amOrPm = "Pm";
        }
        var allTime = hours + ':' + minutes + ":" + seconds + " " + amOrPm;
        return allTime;
    }
    
    myTask.getTasks();

   
        //Day 5 paired task Prototype
        //complete

        var myPhone = {};
        myPhone.phoneArray = [];



    myPhone.Phone = function (osVersion,make, model) {
        this.OSVersion = osVersion;
        this.make = make;
        this.model = model;

    }
    myPhone.Phone.prototype.batteryLife = 100;
    myPhone.Phone.prototype.splashScreen = function () {
        console.log('the phone make is '+this.make+ ' The model is: '+this.model+' Running '+this.OSVersion+ ' With ' +this.batteryLife+ " Battery % left");
    }
    myPhone.Phone.prototype.updateSoftware = function () {
        this.OSVersion++;
        this.batteryLife = this.batteryLife - 10;
    }


    var phone1 = new myPhone.Phone(1.0, 'Nokia', 'IDK');
    var phone2 = new myPhone.Phone(12, 'Samsung', 'S series');
    var phone3 = new myPhone.Phone(54, 'blackBerry', 'thisone');
    myPhone.phoneArray.push(phone1, phone2, phone3);

 
    for (var i = 0; i < myPhone.phoneArray.length; i++) {
        myPhone.phoneArray[i].splashScreen();
    }

    phone2.updateSoftware();
    for (var i = 0; i < myPhone.phoneArray.length; i++) {
        myPhone.phoneArray[i].splashScreen();
    }