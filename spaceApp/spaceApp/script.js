'use strict';

//Build out a SpacePort Application
//Stretch Goal 1: Make your types selectable via a dropdown box instead of simply allowing your user to type in anything they want
//Stretch Goal 2: Make one of your ship types disallow the user from clicking your delete option



var spaceApp = {};
spaceApp.spaceArray = [];
//C.R.U.D create read update delete
//augment the array prototype
Array.prototype.remove = function (index) {
    return this.splice(index, 1);
};

spaceApp.getShips = function () {
    var request = new XMLHttpRequest();
    request.open("GET", 'https://spaceapp.firebaseio.com/.json', false);
    request.onload = function () {
        //Good statuses
        if (this.status >= "200" && this.status < "400") {
            var data = JSON.parse(this.response);
            spaceApp.spaceArray.length = 0;
            for (var m in data) {
                var ship = data[m];
               ship.id = m;
                spaceApp.spaceArray.push(ship);
                //console.log(m);
            };

            spaceApp.showShip();
        }
        else {
            document.getElementById('theList').innerHTML = "Some error occured";
        };


    };
    request.send();
};

spaceApp.dockShip = function () {
    var nameInput = document.getElementById('name');
    var typeInput = document.getElementById('type');
    var imageInput = document.getElementById('image');
   
    var t = new this.CreateShip(nameInput.value, typeInput.value, imageInput.value);
    //this.spaceArray.push(t);

    var request = new XMLHttpRequest();
    //tells where to go and what to do 
    request.open("POST", 'https://spaceapp.firebaseio.com/.json', false);
    //what to do once you get the data from the server
    request.onload = function () {
        //if the data is good
        if (this.status >= "200" && this.status < "400") {
            nameInput.value = '';
            typeInput.value = '';
            imageInput.value = '';
            //store it in the data var
            var data = JSON.parse(this.response);
            //this is the id
            t.id = data.name;
            //push into the array
            spaceApp.spaceArray.push(t);
            //display the data to the page
            spaceApp.showShip();

        }
        else {
            alert('Something failed!');
        }

    }


    request.send(JSON.stringify(t));



};

spaceApp.showShip = function () {
    var h = "<table class='table table-bordered table-striped'>";
    h += '<tr>';
    h += '<th>Name</th>';
    h += '<th>Type</th>';
    h += '<th>Image</th>';
    h += '<th>Leave Port</th>';
    h += '<th>Upgrade Ship</th>';
    h += '</tr>';

    for (var index in this.spaceArray) {
        var ship = this.spaceArray[index];

        h += '<tr>';
        h += '<td>' + ship.name + '</td>';
        h += '<td>' + ship.type + '</td>';
        h += '<td><img src ="' + ship.image + '  "  height="50px" width="50px"></td>';

        h += '<td><button onClick="spaceApp.deleteShip(' + index + ')">Leave</button></td>';
        h += '<td><a id="modal" href="#modal-container-425767" role="button" class="btn" data-toggle="modal" onclick="spaceApp.editShip(' + index + ')">Upgrade</a></td>';
        h += '</tr>';

    }
    h += '</table>';

    document.getElementById('display').innerHTML = h;
};

spaceApp.editShip = function (index) {
    var modalName = document.getElementById('modalName');
    var  modaldrop= document.getElementById('modaldrop');
    var modalImage = document.getElementById('modalImage');
    var modalType = modaldrop.options[modaldrop.selectedIndex].text;
    var id = document.getElementById('hiddenId');
    var ship = this.spaceArray[index];

    modalName.value = ship.name;
    modalType = ship.type;
    modalImage.value = ship.image;
    id.value = index;

};

spaceApp.saveShip = function () {
    var modalName = document.getElementById('modalName');
    var modalType = document.getElementById('modalType');
    var modalImage = document.getElementById('modalImage');
    var id = document.getElementById('hiddenId');
    var ship = this.spaceArray[index];
    console.log(ship.id);

    ship.name = modalName.value;
    ship.type = modalType.value;
    ship.image = modalImage.value;

    var request = new XMLHttpRequest();
    request.open("PATCH", 'https://spaceapp.firebaseio.com/' + ship.id + '.json', false);
    request.onload = function () {
        //Good statuses

        if (this.status == "200") {
            var data = JSON.parse(this.response);
            
            spaceApp.showShip();
            

        } else {
            console.log('Something went wrong');
        }
    }

    request.send(JSON.stringify(ship));
}

spaceApp.deleteShip = function (index) {
    var ship = this.spaceArray[index];
    if (confirm('Are you sure you want to destroy this ship?')) {

        var request = new XMLHttpRequest();
        request.open('DELETE', 'https://spaceapp.firebaseio.com/' + ship.id + '.json', false);
        request.onload = function () {
            if (this.status == "200") {
                spaceApp.spaceArray.remove(index);

                spaceApp.showShip();
            } else {
                console.log(this.status);
                console.log(this.response);
            }
        }

        request.send();



     
    }
};

spaceApp.CreateShip = function (name, type, image) {
    this.name = name;
    this.type = type;
    this.image = image;
};

spaceApp.getShips();