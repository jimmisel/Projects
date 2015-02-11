// call this to stop sloppy code from running in JS
"use strict";


// string
var myName = 'Jim';
// numbers
var someMath = (10 + 2) / 2 + 4 * 2;
//array
var softballTeamJerseyNumbers = [1, 5, 19, 8];
softballTeamJerseyNumbers.push(10);

//boolean value set to isActive
var isActive = true;
var isInactive = false;

//var set to an annonymous function
var displayMessage = function (message) {
    console.log(message);
}
//named function
function alsoDisplayMessage(message) {
    console.log(message);
}

// call function
displayMessage('Here is our message');

//Object
// object literal notation
//defining the values in the object
var jim = {
    // assign inside the object
    favoriteColor: "orange",
    // can also make functions
 showFavoriteColor: function(){
    //add keyword this to call the property
    alert(this.favoriteColor);
}
};
// assign properties to the object outside the object
jim.firstName = 'Jim';
jim.lastName = "Misel";
jim.age = 30;


// camel casing
var thisIsALotOfWords = "just place holder";

