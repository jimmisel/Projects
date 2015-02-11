//Take Home: Review Project without Angular 
//CRUD Application- Robots: Name, Metal, Picture 
//Constructor Function 
//Output created Robots to a table: use a nested for loop to output the properties 
//Connect them to Firebase 
//firebase url = https://jimsrobots.firebaseio.com/
var robots = {};

robots.robotArray = [];

//robots.getData = function () { };
robots.addRobot = function () {
    var image = '';
    var name = document.getElementById('name');
    var metal = document.getElementById('metal');
    
    //set the image based on the metal type
    if (metal.value === 'gold') {
        image = 'http://tomopop.com/ul/20046-550x-C-3PO_Bust_Header.jpg';
    } else if (metal.value === 'steal') {
        image = 'http://plasticandplush.com/images/2011/08/16/jakks-real-steel-atom.jpg';
    
    } else if (metal.value === 'stainless') {
        image = 'http://slurmed.com/fanart/pong123/016_bender-in-heaven-gun-cigar_by-pong123.jpg';
    } else {
        image = 'http://www.kurzweilai.net/images/silver-robot-with-cosmos.jpg';
    }

    var r = new robots.Robot(name.value, metal.value, image);


    var request = new XMLHttpRequest;
    request.open('POST', 'https://jimsrobots.firebaseio.com/.json', r);
    request.onload = function () {
        if (this.status >= "200" && this.status < "400") {   
            var data = JSON.parse(this.response);    
            r.id = data.name;
            robots.robotArray.push(r);
            name.value = '';
            robots.displayRobot();
        }
        else {
            alert('Something failed!');
        }

    }

    request.send(JSON.stringify(r));
};
robots.displayRobot = function () {

    var h = '';
    for (var i in this.robotArray) {
        //for (var ii in this.robotArray[i]) {
        //    h += this.robotArray[i][ii] +'<br />';
            
        //}

        var bot = this.robotArray[i];
        h += '<div class="table-bordered col-md-4 column" style="margin:5px 5px 5px 5px" >';
        h += '<div class="table-bordered" style="background-color:red; height:20px; width:100%; border:thick; padding-left: 10px; margin-bottom:15px">' + bot.name;
        h += ' <button type="button" class="close" data-dismiss="modal" aria-hidden="true"  onclick="robots.deleteRobot(' + i + ')">×</button></div>'
        h += '<center><img src="' + bot.image + '" height="175px" width="175px"></center> </div>';
       
    }

    return document.getElementById('displayBots').innerHTML = h;
    

};

robots.deleteRobot = function (index) {
    var bot = this.robotArray[index];
    var request = new XMLHttpRequest;
    request.open('DELETE', 'https://jimsrobots.firebaseio.com/'+bot.id+'.json');
    request.onload = function () {
        if (this.status >= "200" && this.status < "400") {
            robots.robotArray.splice(index, 1);
            robots.displayRobot()
           
        }
        else {
            alert('Something failed!');
        }

    }

    request.send();
    
};
robots.getRobots = function () {
    var request = new XMLHttpRequest;
    request.open('GET', 'https://jimsrobots.firebaseio.com/.json');
    request.onload = function () {
        if (this.status >= "200" && this.status < "400") {
            var data = JSON.parse(this.response);
            robots.robotArray.length = 0;
            for (var m in data) {
                var bot = data[m];
               bot.id = m;
                robots.robotArray.push(bot);
                //console.log(m);
            };

            robots.displayRobot();
        }
        else {
           return document.getElementById('displayBots').innerHTML = "Some error occured";
        };
    };
    request.send();
};
robots.Robot = function (name,metal,pic) {
    this.name = name;
    this.metal = metal;
    this.image = pic;
}
robots.getRobots();




//angularJS
//day 14 create a directive
//first two letters work like the ng-
//to call this you would use jm-Name-It
//app.directive('jmNameIt', function () {
//    return function (scope, element, attrs) {
//        //use jQuery if you know it
//        var templetEle = $(element);
//        var value = templetEle.attr('jm-Name-It');
//        $(element).html('<em>' + value + "</em>");
//    }
//});
////custom filters
////set it up as a filter in the html with a box to type in to search for things

//app.filter('search', function () {
//    return function (items, searchTerm) {
//        if (!searchTerm)
//            return items;
        
//        var filteredItems = [];

//        angular.forEach(items, function (item) {
//            if (item.text.indexOf(searchTerm) !== -1) {
//                filteredItems.push(item);
//            }
//        })
//        return filteredItems;
//    }
//});

//test review phase 1
