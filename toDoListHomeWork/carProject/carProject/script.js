var car = {
    make: 'ford',
    color: 'black',
    year: 2000,
    runs: false,
    myCarRuns: function () {
        if (this.runs === false) {
            alert('No it dont');
        }
    }
}
car.myCarRuns();

var car2 = {
    make: 'honda',
    color: 'black',
    year: 2006,
    runs: true
}

var carArray = [car, car2];

var callCar = function (make) {
    alert(make);
}

callCar(carArray[0].make);

