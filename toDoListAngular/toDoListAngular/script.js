var app = angular.module('toDoList',['angularMoment']);

app.controller('IndexController', function ($scope, taskServices) {
    taskServices.getTask().then(function (data) {
       
        $scope.taskArray = data;
       
    },function (response) {
        console.log('there was an error. This is what is says:'+response)
    });

  

    $scope.addTask = function () {
       
        taskServices.addTask($scope.priority, $scope.task);
       
    };
    $scope.removeTask = function (task) {
        taskServices.removeTask(task);
        
    };
    $scope.markComplete = function (m) {
        taskServices.markComplete(m);
    };
   
 
});


app.factory('taskServices', function ($http, $q) {
     var taskArray = [];
   

     var getTask = function () {
         var deferred = $q.defer();

         $http({
             url: 'https://jimstodolist.firebaseio.com/.json',
             method: 'GET'
         }).success(function (data) {

             taskArray.length = 0;
             for (var taskId in data) {
                 var taskid = data[taskId]
                 taskid.id = taskId;
                 taskArray.push(taskid);
               
             }
           //  console.log(taskArray);
             deferred.resolve(taskArray);
         }).error(function () {
             deferred.reject();
         });

         return deferred.promise;
     };
     var addTask = function (priority, task) {
         
        var m = {
            priority:priority,
            task: task,
            complete: 'No',
            time: new Date(),
            timetoComplete: null,
            hide: false
        }
        priority = '';
        task = '';
        var sortForMe = '-priority';
        var sortDone = '-complete';
        $http.post('https://jimstodolist.firebaseio.com/.json', m).success(function () {
            taskArray.push(m);

        });
    };
     var removeTask = function (task) {
         
        var taskTo = taskArray[taskArray.indexOf(task)];
        $http.delete('https://jimstodolist.firebaseio.com/' + taskTo.id + '.json').success(function () {
            taskArray.splice(taskArray.indexOf(task), 1);
        });
         
    };
     var markComplete = function (m) {
       
    var sendIt= taskArray[taskArray.indexOf(m)] = {
            priority: m.priority,
            task: m.task,
            complete: 'Yes',
            timetoComplete: new Date(),
            hide: true
        }
        $http({
            url: 'https://jimstodolist.firebaseio.com/' + m.id + '.json',
            method: 'PATCH',
            data: sendIt
        })
     };
     return{
         getTask: getTask,
         addTask: addTask,
         removeTask:removeTask,
         markComplete: markComplete
     };

});