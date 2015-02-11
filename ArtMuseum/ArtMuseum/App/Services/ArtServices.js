app.factory("ArtServices", function ($q, $http) {
    var artist = [];
    
    //The database calls go here. use $http to make the api calls

    //get all call for the artist
    var getArtist = function () {
        var deferred = $q.defer();

        $http({
            url: '../api/ArtWork',
            method: 'GET'
        }).success(function (data, status) {

            while (artist.length) {
                artist.pop();
            };
            for (var x in data) {
                if (data[x].IsArtist == true) {
                    artist.push(data[x]);
                } 
               
            };
            deferred.resolve(artist);
        }).error(function (data, status) {
            deferred.reject();

        });
        return deferred.promise;
    };


      


    //get all user artwork
    //get one piece from that last collection

    //post call to add new
    //will only be used by the admin
    
    //put call to update
    //can be used by the artist that made it or the admin

    //delete call to remove art
    //only the admin can delete art




    //Return the function like objects
    return {
        getArtist: getArtist,
    };

});