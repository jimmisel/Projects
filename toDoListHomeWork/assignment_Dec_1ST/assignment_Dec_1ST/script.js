
var myObject = {
    myColor: "blue",
    totalCost: 5.99
};

var num = myObject.totalCost;
num = num.toString();
var domChanges = function () {
    document.getElementById("r1").style.border = "thin solid " + myObject.myColor;
    document.getElementById("r1").innerHTML = window.location.href;
    document.getElementById("r2").innerHTML = "$" + num;
}
domChanges();