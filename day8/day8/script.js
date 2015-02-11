//polling
//var time = function () {
//    //alert('time out reached');
//}


////recursion a function that keeps calling itself
//var checkForUpdates = function () {
//    console.log('checking server for updates');
//    setTimeout(checkForUpdates,2000);
//};
//var timeOutId = setTimeout(checkForUpdates, 3000);


//closure 
//function mathThing(number) {
//    var result = number += number;
//    return result;
//}

//a function inside a function to remember (creates memory for the info sent)
function mathThing2(number) {
    return function () {
        return number += number;
    };
    
};
//var test = mathThing2(4);
//console.log(test());

for (var i = 1; i <= 5; i++) {
    setTimeout(function () {
        console.log(i);
    },1000*i);
}