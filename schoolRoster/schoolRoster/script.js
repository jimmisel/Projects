//Build a new application: Roster of Hogwarts Students (Name, House, Year)
//Post to Firebase
//Get from Firebase 
//Display data from firebase to page 
//Stretch:  
//Delete from firebase 
//Only do a full GET on page load but keep data in sync 
//Update 
var hogwartsStudents = {};
hogwartsStudents.students = [];
hogwartsStudents.getStudents = function () {
    
    var request = new XMLHttpRequest();
    request.open("GET", 'https://louishogwarts.firebaseio.com/students/.json', true);
    request.onload = function () {
        
        if (this.status >= "200" && this.status < "400") {
            var data = JSON.parse(this.response);

            hogwartsStudents.students.length = 0;

            for (var m in data) {
                var student = data[m];
                student.id = m;
                hogwartsStudents.students.push(student);
                    
            };

            hogwartsStudents.showStudents();
        }
        else {
            alert( "Some error occured");
        };
    };
    request.send();
  
}



hogwartsStudents.addStudent = function () {
    var nameInput = document.getElementById('name');
    var houseInput = document.getElementById('house');
    var yearInput = document.getElementById('year');
    var picInput = document.getElementById('pic');

    var t = new this.NewStudent(nameInput.value, houseInput.value, yearInput.value, picInput.value);
    
    nameInput.value = '';
    houseInput.value = '';
    yearInput.value = '';
    picInput.value = '';
    var request = new XMLHttpRequest(); 
    request.open("POST", 'https://louishogwarts.firebaseio.com/students/.json', true);
    request.onload = function () {
        if (this.status >= "200" && this.status < "400") {
           
            var data = JSON.parse(this.response);
            
            t.id = data.name;
            
            hogwartsStudents.students.push(t);
            
            hogwartsStudents.showStudents();
        }
        else {
            alert('Something failed!');
        }

    }


    request.send(JSON.stringify(t));


}
hogwartsStudents.showStudents = function () {
    var h = "<table class='table table-bordered table-striped'>";
    h += '<tr><tbody>';
    h += '<th>Name</th>';
    h += '<th>House</th>';
    h += '<th>Year</th>';
    h += '<th>Pic</th>';
    h += '<th>Update</th>';
    h += '<th>Delete</th>';
    h += '</tr>';

    for (var index in this.students) {
        var kid = this.students[index];

        h += '<tr>';
        h += '<td>' + kid.name + '</td>';
        h += '<td>' + kid.house + '</td>';
        h += '<td>' + kid.year + '</td>';
        h += '<td><img src="' + kid.pic + '" height="50px" width="50px"></td>';
        h += '<td><a id="modal-308430" href="#modal-container-308430" role="button" class="btn" data-toggle="modal" onclick="hogwartsStudents.editStudents(' + index + ')">Update</a></td>';
        h += '<td><button onClick="hogwartsStudents.deleteStudent(' + index + ')">Delete</button></td>';
        h += '</tr>';
    } h += '<tr></tr>';
    h += '</tbody>';
    h += '</table>';
     return document.getElementById('show').innerHTML = h;
 
}
hogwartsStudents.editStudents = function (index) {
    var nameInput = document.getElementById('mname');
    var houseInput = document.getElementById('mhouse');
    var yearInput = document.getElementById('myear');
    var picInput = document.getElementById('mpic');
    var studentId = document.getElementById('id');
    var student = this.students[index];

    nameInput.value = student.name;
    houseInput.value = student.house;
    yearInput.value = student.year;
    picInput.value = student.pic;
    studentId.value = index;

}
hogwartsStudents.saveStudents = function () {
    var nameInput = document.getElementById('mname');
    var houseInput = document.getElementById('mhouse');
    var yearInput = document.getElementById('myear');
    var picInput = document.getElementById('mpic');
    var studentId = document.getElementById('id');
    var student = this.students[studentId.value];

    student.name = nameInput.value;
    student.year = yearInput.value;
    student.house = houseInput.value;
    student.pic = picInput.value;
    var request = new XMLHttpRequest();
    request.open("PATCH", 'https://louishogwarts.firebaseio.com/students/' + student.id + '.json', true);
    request.onload = function () {
        

        if (this.status == "200") {
            var data = JSON.parse(this.response);
            student.id = data.name;
            hogwartsStudents.showStudents();
        } else {
            console.log('Something went wrong');
        }
    }

    request.send(JSON.stringify(student));
   
    
   
}
hogwartsStudents.deleteStudent = function (index) {
  
    var student = this.students[index];

    var request = new XMLHttpRequest();
    request.open('DELETE', 'https://louishogwarts.firebaseio.com/students/' + student.id + '.json', true);
    request.onload = function () {
        if (this.status == "200") {
            hogwartsStudents.students.splice(index, 1);
            hogwartsStudents.showStudents();
        } else {
            console.log(this.status);
            console.log(this.response);
        }
    }

    request.send();


}

hogwartsStudents.NewStudent = function (name, house, year, pic) {
    this.name = name;
    this.house = house;
    this.year = year;
    this.pic = pic;
}
hogwartsStudents.getStudents();