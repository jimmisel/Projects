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
var result = addNumers(2, 4, 5);




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