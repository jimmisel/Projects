'use strict';
//chirper app
//profileObject = name, photo, location
//TweetObject = user, timestamp, tweet
//frinedsObject = user, photo, locoation, url
//pages = index.html & timeline.html
//from Louis Murphy to Everyone:
//https://chirperlouism.firebaseIO.com/
//from huseyin to Everyone:
//https://chirperhuseyin.firebaseio.com/
//from Coral Morris to Everyone:
//https://chirpercoralm.firebaseio.com/ 

var chirpApp = {};
chirpApp.myProfile = [];
chirpApp.friends = [];
chirpApp.tweets = [];
chirpApp.friendsInfo = [];
chirpApp.allTweets = [];
var baseURL = 'chirperjim';

//makes all the calls onload to the db to get you loaded with info
chirpApp.getAll = function () {
    chirpApp.profileGet();
    chirpApp.friendGet();
    chirpApp.tweetGet();
    
}
// set up to make all the calls when the function is called
chirpApp.fireCall = function (verb, url, data, success) {
    var request = new XMLHttpRequest();
    request.open(verb, url);
    request.onload =function () {
        if (this.status >= '200' && this.status < '400') {
            if (success && typeof (success) == 'function') {
                var data = JSON.parse(this.response);
                success(data);
            }
        } 
    };
    if (verb === "GET" || verb === 'DELETE') {
        request.send();
    } else {
        request.send(JSON.stringify(data));
    }
};
//makes the urls to get the info from the db --- need to adjust a few for friends
 chirpApp.urlMaker = function (base) {
    var url = "https://" + base + ".firebaseio.com/"
    for (var i = 1; i < arguments.length; i++) {
        url += arguments[i];
    }
    return url + "/.json";
};
//CRUD for profile;
chirpApp.profileDisplay = function () {

        for (var m in chirpApp.myProfile) {
            var profile = chirpApp.myProfile[m];
            var h = '<img alt="140x140" src="' + profile.photo + '" height="140px" width="140px"/>';
            h += '<br />' + profile.name + '<br />' + profile.location + '<br />';
      
        
    };
        return document.getElementById('proPic').innerHTML = h;
};
//works but no need to make more than one yet
chirpApp.createProfile = function () {
    var nameInput = document.getElementById('name');
    var locationInput = document.getElementById('location');
    var picInput = document.getElementById('pic');

    var t = new this.Profile(nameInput.value, picInput.value, locationInput.value);
    
    chirpApp.fireCall("POST", chirpApp.urlMaker(baseURL, "profile"), t, function () {
        chirpApp.myProfile.push(t);
        nameInput.value = '';
        locationInput.value = '';
        picInput.value = '';
        chirpApp.profileDisplay();
    });


}
// get only my profile info for now
chirpApp.profileGet = function () {
    chirpApp.fireCall("GET", chirpApp.urlMaker(baseURL,"profile"), null, function (data) {
        for (var m in data) {
            var profile = data[m];
            profile.id = m;
            chirpApp.myProfile.push(profile);
        };
        chirpApp.profileDisplay();
    });
};

//set up the update form
chirpApp.profileUpdate = function () {
    var nameInput = document.getElementById('editName');
    var locationInput = document.getElementById('editLocation');
    var picInput = document.getElementById('editPic');

    nameInput.value = this.myProfile[0].name;
    locationInput.value = this.myProfile[0].location;
    picInput.value = this.myProfile[0].photo;

    chirpApp.profileDisplay();
};
//saves the profile once your done editing
chirpApp.saveProfile = function () {
    var nameInput = document.getElementById('editName');
    var locationInput = document.getElementById('editLocation');
    var picInput = document.getElementById('editPic');
   
    this.myProfile[0].name = nameInput.value;
    this.myProfile[0].location = locationInput.value;
    this.myProfile[0].photo = picInput.value;
    var info = this.myProfile[0].name;
    info += this.myProfile[0].location;
    info += this.myProfile[0].photo;
    chirpApp.fireCall("PATCH", 'https://chirperjim.firebaseio.com/profile/'+chirpApp.myProfile[0].id+'.json', info, function () {
        for (var m in data) {
            var profile = data[m];
            profile.id = m;
            chirpApp.myProfile.push(profile);
        };
        chirpApp.profileDisplay();
    });
}
chirpApp.Profile = function(name,photo,location) {
    this.name = name;
    this.photo = photo;
    this.location = location;
};
// CRUD for tweets;
// this will let you change between all tweets and my own
chirpApp.myTweetsOnly = function () {
    this.allTweets.sort(function (a, b) {
        if (moment(a.timestamp).unix() > moment(b.timestamp).unix()) {
            return -1;
        }
        else if (moment(a.timestamp).unix() < moment(b.timestamp).unix()) {
            return 1;
        }
        else {
            return 0;
        }
    });
    var h = '';
    for (var m in this.tweets) {
        var tweet = this.tweets[m];

        h += '<blockquote>';
        h += '<p>';
        h += tweet.message;
        h += '</p> <small>' + tweet.user + '</small><small>' + moment(tweet.timestamp).format('LLL') + '</small>';
        h += '</blockquote>';
    };
    $('#changeTweets').hide('fast');
    $('#changeTweets2').removeClass('hidden');
    return document.getElementById('displayTweet').innerHTML = h;

};
//show all tweets
chirpApp.tweetDisplay = function () {

    this.allTweets.sort(function (a, b) {
        if (moment(a.timestamp).unix() > moment(b.timestamp).unix()) {
            return -1;
        }
        else if (moment(a.timestamp).unix() < moment(b.timestamp).unix()) {
            return 1;
        }
        else {
            return 0;
        }
    });
    var h = '';
    for (var m in this.allTweets) {
        var tweet = this.allTweets[m];

        h += '<blockquote>';
        h += '<p>';
        h += tweet.message;
        h += '</p> <small>' + tweet.user + '</small><small>' + moment(tweet.timestamp).format('LLL') + '</small>';
        h += '</blockquote>';
    };
    $('#changeTweets').show('fast');
    $('#changeTweets2').addClass('hidden');
  return document.getElementById('displayTweet').innerHTML = h;
};
//lets you press enter to submit the tweet
$('#tweet').keydown(function (e) {
    if (e.keyCode == 13) {
        $("tweetIt").submit();
       chirpApp.createTweet()
    }
});
//creates the tweet and sends to firebase
chirpApp.createTweet = function () {
  
    var tweetInput = document.getElementById('tweet');
    var t = new this.Tweet(tweetInput.value);
    
    chirpApp.fireCall("POST", chirpApp.urlMaker(baseURL, "tweets"), t, function () {
        chirpApp.tweets.push(t);
        tweetInput.value = '';
        chirpApp.tweetDisplay();
    });
   
}
//get my tweets
//gets all tweets when called pushes to two different arrays
chirpApp.tweetGet = function () {
    chirpApp.fireCall("GET", chirpApp.urlMaker(baseURL, 'tweets'), null, function (data) {
        for (var m in data) {
            var tweet = data[m];
            tweet.id = m;
            chirpApp.tweets.push(tweet);
            chirpApp.allTweets.push(tweet);
        };
        for (var i = 0; i < chirpApp.friends.length; i++) {
            chirpApp.fireCall("GET", chirpApp.friends[i].url + "tweets/.json", null, function (data) {

                for (var x in data) {
                    var friendtweet = data[x];
                    friendtweet.id = x;
                    chirpApp.allTweets.push(friendtweet);
                    
                }
                chirpApp.tweetDisplay();
            });
        };
       
    });
}
//update my tweets only ---- needs done
chirpApp.tweetUpdate = function () {

};
//delete only my tweets ---- needs done
chirpApp.deleteTweet = function () {

}
//the tweet object only sending the message and seting the rest inside
chirpApp.Tweet = function (tweet) {
    this.message = tweet;
    this.user = "Jim Misel";
    this.timestamp = moment().format('LLL');
};
//CRUD for friends;
chirpApp.friendGet = function () {
    chirpApp.fireCall("GET", chirpApp.urlMaker(baseURL, 'friends'), null, function (data) {
        for (var m in data) {
            var friend = data[m];
            friend.id = m;
            chirpApp.friends.push(friend);
        };

        for (var i = 0; i < chirpApp.friends.length; i++) {
            chirpApp.fireCall("GET", chirpApp.friends[i].url + "profile/.json", null, function (data) {

               for (var x in data) {
                    var friendInfo = data[x];
                    friendInfo.id = x;
                    chirpApp.friendsInfo.push(friendInfo);
              }
               chirpApp.friendDisplay();
           });

      }

        
    });

}
//show their pic on the page the right hand side
chirpApp.friendDisplay = function () {
   
    var h = '';
    h += ' <p> <label for="exampleInputEmail1">firebase</label><input type="text" class="form-control" id="addFriend" /></p>';
    h += '  <p><button type="submit" class="btn btn-default" onclick="chirpApp.createFriend()">Add friend button</button></p>';
    for (var z in chirpApp.friendsInfo) {
        var friend = chirpApp.friendsInfo[z];
       
        h += ' <a href="#panel-435220" data-toggle="tab" role="button" onclick="chirpApp.friendsTimeLine (' + z + ')"><img src="' + friend.photo + '" width="50px" height="50px"></a> '
      
    };
   
      return document.getElementById('showFriends').innerHTML = h;
}
//shows their info in the friends tab on the left side --- might not be using anymore
chirpApp.displayFriendProfile = function(index){
    var ht = '<div>';
    var profile = chirpApp.friendsInfo[index];
    ht += '<h4 class="modal-title" id="myModalLabel">';
    ht +=  profile.name ;
    ht += '</h4>';
    ht += '<img alt="140x140" src="' + profile.photo + '" height="200px" width="200px"/>';
    ht +=  '<br />' + profile.location + '<br /></div>';
    chirpApp.showFriendsTweets(index);
    return document.getElementById('displayFriend').innerHTML = ht;
    
}
//shows friends info
chirpApp.friendsTimeLine = function (index) {

    var ht = '<div>';
    var profile = this.friendsInfo[index];
   
    ht += '<img alt="140x140" src="' + profile.photo + '" height="200px" width="200px"  style=" padding: 10px 10px 10px 10px "/>';
    ht += '<br />' + profile.name;
    ht += '<br />' + profile.location + '<br /></div>';
    
    this.showFriendsTweets(index);
    return document.getElementById('friendProPic').innerHTML = ht;


};
// shows only friends tweets on their page also sets the tabs 
chirpApp.showFriendsTweets = function (index) {
    var ftweets = [];
    $("#makeActive").addClass('active');
    $("#first").removeClass('active');
    var profile = this.friendsInfo[index].name;
    for (var m = 0; m < this.allTweets.length; m++) {
        if (profile === this.allTweets[m].user) {
            ftweets.push(this.allTweets[m]);
        }
    }
    var h = '';
    ftweets.sort(function (a, b) {
        if (moment(a.timestamp).unix() > moment(b.timestamp).unix()) {
            return -1;
        }
        else if (moment(a.timestamp).unix() < moment(b.timestamp).unix()) {
            return 1;
        }
        else {
            return 0;
        }
    });

    
    for (var i in ftweets) {
        var tweet = ftweets[i];
        h += '<blockquote>';
        h += '<p>';
        h += tweet.message;
        h += '<small>' + moment(tweet.timestamp).format('LLL') + '</small>';
        h += '</p></blockquote>';

    }
   
     ftweets.length = 0;
    return document.getElementById('friendDisplayTweet').innerHTML = h;
}
//add their link to my fire base
chirpApp.createFriend = function () {
    var friendInput = document.getElementById('addFriend');
    var t = new this.Friends(friendInput.value);
    chirpApp.fireCall("POST", chirpApp.urlMaker(baseURL, "friends"), t, function () {
        chirpApp.friends.push(t);
        friendInput.value = '';
        chirpApp.friendDisplay();
    });
}
//delete their link from my db--- needs done
chirpApp.deleteFriend = function () {

}
// update their link if screwed up not important so didnt finish
    chirpApp.friendUpdate = function () {

    };
//makes the friend object well just their link no need to save info to mine from theirs
    chirpApp.Friends = function (url) {
        this.url = url;
    }

    chirpApp.getAll();
    chirpApp.profileDisplay();
