app.controller('BlogController', ['$scope', 'BlogService', '$routeParams', function ($scope, BlogService, $routeParams) {
    BlogService.getPosts().then(function (data) {
            $scope.blogPost = data;
        }, function (response) {
            console.log('there was an error. This is what is says:' + response)
        });


    var id = $routeParams.id;
    $scope.post = BlogService.getPost(id);

    
    if ($scope.post) {
        $scope.etitle = $scope.post.blogTitle;
        $scope.ebody = $scope.post.blogBody;
    }
    else {
        $scope.etitle = '';
        $scope.ebody = '';
    }



    $scope.addPost = function () {
        BlogService.addPost($scope.title, $scope.body);
        title = '';
        body = '';
    };
    $scope.editPost = function () {
        BlogService.editPost(id);
    
    };
    $scope.updatePost = function () {
       BlogService.updatePost(id, $scope.etitle, $scope.ebody);
    };
    $scope.deletePost = function () {
        BlogService.deletePost(id);
    }

 

}]);


    
