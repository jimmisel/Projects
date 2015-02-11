//var animal = {
//    numberOfLegs: 4
//};
//var cat = {
//    hasClaws: true
//};
//// object constructor invocation patteren
//var Animal = function () {
//    this.numberOfLegs = 4;

//}

//intend to invoke using the object constructor invocation patteren
var City = function (name, location) {
    this.name = name;
    this.location = location;
}

City.prototype.display = function () {
    return this.name + ' is located at: ' + this.location;
}
//use the new keyword to create a new object with a name and ocation property
var denver = new City('Denver ', '18.9');
var huston = new City('Houston ','19.19.29')

//City.__proto__ = function
//Prototype.__proto__ = object prototype
//City.Prototype ={name:name, location:location}