app.factory('BlogService', function ($http, $q) {
    var blogPosts = [];
    var baseUrl = 'https://coolblog.firebaseio.com/';
    var user = 'Jim Misel';

    // Get Posts from firebase
    var getPosts = function () {

        var deferred = $q.defer();

        $http({
            url: baseUrl + 'blogPosts/.json',
            method: 'GET'
        }).success(function (data) {
            blogPosts.length = 0;
            for (var m in data) {
                var post = data[m];
                post.id = m;
                blogPosts.push(post);
            }
           
            deferred.resolve(blogPosts);
        }).error(function () {
            deferred.reject();
        });

        return deferred.promise;
    };

    var addPost = function (title, body) {
        addPostToDB(title, body).then(function (data) {
            
            return data;
        }, function () {
            console.log('failed to delete');
        });
    }

    // Add new task to firebase
    var addPostToDB = function (title, body) {
        var deferred = $q.defer();
        var post = {
            blogTitle: title,
            blogBody: body,
            timestamp: new Date(),
            author: user
        }

        var req = {
            method: 'POST',
            url: baseUrl + 'blogPosts/.json',
            data: post
        };
        $http(req).success(function (data) {
            post.id = data.name;
            blogPosts.push(post);
            deferred.resolve(blogPosts);
        }).error(function () {
            deferred.reject();
        });
        return deferred.promise;
    };

    var getPost = function (id) {

      
        var post;
        for (var index in blogPosts) {
            if (blogPosts[index].id == id) {
                post = blogPosts[index];
                return post;
            }
        }

       

        
    }

    var updatePost = function (id, title, body) {
        updatePostToDB(id, title, body).then(function (data) {
            return data;
        }, function () {
            console.log('failed to delete');
        });

    }

    var updatePostToDB = function (id, title, body) {
        var deferred = $q.defer();
        var post = getPost(id);

        if (!post)
            deferred.reject();

        post.blogBody = body;
        post.blogTitle = title;

        var updatePost = {
            blogTitle: title,
            blogBody: body,
            author: post.author,
            timestamp: new Date()
        }

        post.blogTitle = title;
        post.blogBody = body;
        //Make 'PATCH' request to update task in Firebase
        $http({
            url: baseUrl + 'blogPosts/' + post.id + '.json',
            method: 'PATCH',
            data: post
        }).success(function (data) {
            deferred.resolve(blogPosts);
        }).error(function (data) {
            deferred.reject();
        });
        return deferred.promise;
    };

    var deletePost = function (id) {
        deletePostFromDB(id).then(function (data) {
            return data;
        }, function () {
            console.log('failed to delete');
        });
    }


    var deletePostFromDB = function (id) {
        var deferred = $q.defer();
        var post = getPost(id);
        var index = blogPosts.indexOf(post);
        if (index == -1) {
            return deferred.reject();
        }

        $http({
            url: baseUrl + 'blogPosts/' + post.id + '.json',
            method: 'DELETE'
        }).success(function (data) {
            blogPosts.splice(index, 1);
            deferred.resolve(blogPosts);
        }).error(function () {
            deferred.reject();
        });
        return deferred.promise;
    }

    return {
        addPost: addPost,
        deletePost: deletePost,
        getPosts: getPosts,
        updatePost: updatePost,
        getPost: getPost,
       
    };
});