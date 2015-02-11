'use strict';

//array literal notation
//var studentArray = [];
// another way to creat an array oop way
var studentArray = new Array();
//object literal notation
var student1 = {
    firstName: 'jim',
    lastName: 'misel',
    gradeLevel: 'freshmen'
};

studentArray.push(student1);

var student2 = {
    firstName: "coral",
    lastName: 'morris',
    greadLevel: 'sophomore'
}
studentArray.push(student2);

var resultDiv = document.getElementById('result');

var addStudent = function () {
    //this lets us pull the value from the text input boxes from the html
    var firstNameInput = document.getElementById('firstName');
    var lastNameInput = document.getElementById('lastName');
    var gradeLevelInput = document.getElementById('gradeLevel');
    //the this keyword depends on where the function is built but is always there

    // this adds to the array for the student object
    var s = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        gradeLevel: gradeLevelInput.value
    }
    studentArray.push(s);
    // use this to clear the boxes after the input is taken by the function
    firstNameInput.value = "";
    lastNameInput.value = "";
    gradeLevelInput.value = "";
  
}


var addNumbers = function (num1, num2) {
    // built in array for a function that is always there
    //arguments[2];
    var result = 0;

    for (var i = 0; i < arguments.length; i++) {
        result += arguments[i]
    }
    // sends the data back out of the function
    return result;
}
//stores the info from the function once complete and returned
//var result = addNumers(2, 4, 5);




// takes the last item off the array you can store it in a var.
//studentArray.pop();

//give you the place in the array
//studentArray.indexOf(student1);


//removes the first item in the array same as pop just other end
//studentArray.shift();

//puts the first item back in the array that shift took from it
//studentArray.unshift();

// changes the array so the first becomes the last and so on
//studentArray.reverse();

// removes items from the array. first pram is where to start second pram tells how many to remove
//studentArray.splice(1, 1);

//this is a named function
//JS looks for these before anything else is done
//can call this anywhere in the script as it is loaded before anything else. 
// doing this the other way and trying to call at the top would cause an error
function namedFunction() {
    console.log('Jim Misel');
}

// you can use typeof keyword to check to see what type of var it is ex number string object pr function

var myFunction = function (num1) {
    num1 = typeof(num1);
    return num1;
}

var reversedString = function (myString) {
    if (typeof (myString) != "string" || myString === "") {
        return myString = "an Error has happened";
    }
    var revStr = myString;
    revStr = revStr.split("").reverse().join("");
    return revStr;

}

var addNum = function (num1, num2) {
    return num1 + num2;
}

var multiNum = function (num1, num2) {
    return num1 * num2;
}

var upperCaseString = function (myString) {
    return myString.toUpperCase();
}

var mashUp = function (myString) {
  myString =  reversedString(myString);
  myString = upperCaseString(myString);
    return myString;
}

// indvidual task
// task 0
var myArray = [];
var arrayPush = function () {
    var input = document.getElementById("input1");
    myArray.push(input.value);
    input.value = "";
    return myArray;
    
}

var displayArray = function () {
    for (var i = 0; i < myArray.length; i++) {
        alert(myArray[i]);
    }
}
// task 1 not working all the way yet

var task1Array = [];
var addToDiv = function () {
    var input = document.getElementById("task1");
    task1Array.push(input.value);
    input.value = "";
    var div = document.getElementById("task1Div");
    for (var i = 0; i < task1Array.lenght; i++) {
       div.innerHTML += task1Array[i] + '<br />';
   }

}

// task 2
var task2Array = [];
var arrayPush2 = function () {
    var input = document.getElementById("task2");
    task2Array.push(input.value);
    input.value = "";
    return task2Array;
}
var arrayAlert2 = function () {
    var input2 = document.getElementById("task2Text2");
    alert(task2Array[input2.value]);
    input2.value = "";
    
}

// task 3
var task3Array = [];
var arrayPush3 = function () {
    var input = document.getElementById("task3");
    task3Array.push(input.value);
    input.value = "";
    return task3Array;
}
var divDisplay3 = function () {
    var div = document.getElementById("task3Div");
    div.innerHTML += task3Array.reverse() + '<br />';
   
}

//task 4
var task4Array = [];
var arrayPush4 = function () {
    var input = document.getElementById("task4");
    task4Array.push(input.value);
    input.value = "";
    return task4Array;
}
var divDisplay4 = function () {
    var div = document.getElementById("task4Div");
    var input = document.getElementById('task4Text2').value;
    div.innerHTML += task4Array[input] + '<br />';
}

// task 5
var task5Array = [];
var arrayPush5 = function () {
    var input = document.getElementById("task5");
    task5Array.push(input.value);
    input.value = "";
    return task5Array;
}
var divDisplay5 = function () {
    var div = document.getElementById("task5Div");
   
    for (var i = 0; i < task5Array.length; i++) {
        div.innerHTML += task5Array[i] + '<br />';
    }
}

//task 6
var task6Array = [];
var arrayPush6 = function () {
    var input = document.getElementById("task6");
    task6Array.push(input.value);
    input.value = "";
    return task6Array;
}
var divDisplay6 = function () {
    var div = document.getElementById("task6Div");

    for (var i = 0; i < task6Array.length; i++) {
        if (task6Array[i] % 2 === 0) {
            div.innerHTML += task6Array[i] + '<br />';
        }
    }
}

// task 7   
var task7Array = [];
var arrayPush7 = function () {
    var input = document.getElementById("task7");
    task7Array.push(input.value);
    input.value = "";
    var div = document.getElementById('task7Div');

    for (var i = 0; i < task7Array.length; i++) {
            div.innerHTML = div.innerHTML + task7Array[i] + '<br />';
      
    }
}

//task 8
var task8Array = [];
var arrayPush8 = function () {
    var input = document.getElementById("task8");
    task8Array.push(input.value);
    input.value = "";
}
var arrayDelete = function () {
    var input = document.getElementById("task8Text2");
    task8Array.splice(input.value,1);
    input.value = "";
}
// task 9
var task9Array = [];
var arrayPush9 = function () {
    var input = document.getElementById("task9");
    task9Array.push(input.value);
    input.value = "";
    var div = document.getElementById('task9Div');

    for (var i = 0; i < task9Array.length; i++) {
        div.innerHTML = div.innerHTML + task9Array[i] + '<br />';

    }
}
var newValue = function () {
    var input = document.getElementById("task9Text2");
    var outPut = document.getElementById("task9");
    outPut.value = task9Array[input.value];
}