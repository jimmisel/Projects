app.controller('BlogController', ['$scope', 'BlogService', '$routeParams', function ($scope, BlogService, $routeParams) {
    BlogService.getPosts().then(function (data) {
        $scope.blogPost = data;
        $scope.blogPost.reverse();
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
        $scope.ebody='';
    }



    $scope.addPost = function () {
        BlogService.addPost($scope.title, $scope.body);
        $scope.title = '';
        $scope.body = '';
        $('#success').removeClass('hidden');
    };
    $scope.editPost = function () {
        BlogService.editPost(id);
    
    };
    $scope.updatePost = function () {
        BlogService.updatePost(id, $scope.etitle, $scope.ebody);
        $('#edit').removeClass('hidden');
        
    };
    $scope.deletePost = function () {
      var t =  confirm('Are your sure you want to delete this post?');
        if (t) {
            BlogService.deletePost(id);
            $(location).attr('href', '#/');
        } 
        
       
    }

 

}]);


    
