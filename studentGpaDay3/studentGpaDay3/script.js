//Task: Build a simple page that lists students on a div and display the following information
//-Name
//-Courses
//-Average GPA of all courses
//1. Create an Object Constructor function that will build Course objects.

//a. The Course object will have the following properties and corresponding data types
//-Name: string
//-GPA: number


//2. Create an Object Constructor function that will build Student objects.

//a. The Student object will have the following properties and corresponding data types
//-firstName: string
//-lastName: string
//-courses: array
//-AvgGPA: number

//b. The courses array will contain Course objects


//3. Use your Object Constructor function to build 4 students with different values for all the properties including the courses array

//4. For each Student object, calculate the average GPA from the GPA value on each Course in their courses array and set the value to the AvgGPA property for the current Student object

//5. Use Bootstrap to configure a row to have 4 columns of equal space and write each Student's property values into the columns. The columns should be sorted by the student with the highest average GPA in the first column, etc.

//6. Add a star Bootstrap Glyphicon for the 2 students with the highest average GPA.

var studentData = {};

studentData.studentArray = [];


studentData.createStudents = function () {
    var firstNameInput = document.getElementById('firstName');
    var lastNameInput = document.getElementById('lastName');
    var coursesInput = document.getElementById('courses');
    var gpaInput = document.getElementById('gpa');

    var t = new this.Students(firstNameInput.value, lastNameInput.value, coursesInput.value, gpaInput.value)
    this.studentArray.push(t);

     firstNameInput.value = '';
     lastNameInput.value = '';
     coursesInput.value = '';
     gpaInput.value = '';

     this.showData();
}

studentData.showData = function () {
    var h = "<table class='table'>";
    h += '<tr>';
    h += '<th>Student 1</th>';
    h += '<th>Student 2</th>';
    h += '<th>Student 3</th>';
    h += '<th>Student 4</th>';
    h += '</tr>';

    this.studentArray.sort(function (a, b) {
        if (a.gpa < b.gpa) {
            return -1;
        } else if (a.gpa > b.gpa) {
            return 1;
        } else {
            return 0;
        }
    });
    
        
    for (var index in this.studentArray) {
        var student = this.studentArray[index];

        h += '<tr>';
        h += '<td>' + student.firstName + '</td>';
        h += '<td>' + student.lastName + '</td>';
        h += '<td>' + student.course + '</td>';
        h += '<td>' + student.avgGpa + '</td>';
        h += '</tr>';
   
    }
    h += '</table>';

    document.getElementById('studentDisplay').innerHTML = h;
}

studentData.Courses = function (courseName, courseGpa) {
    this.course = courseName;
    this.gpa = courseGpa;

};

studentData.Students = function (firstName, lastName, courses, avgGpa) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.course = courses;
    this.avgGpa = avgGpa;
};







