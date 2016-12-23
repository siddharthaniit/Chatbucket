var likes=0;
var Chatbucket=angular.module("Chatbucket",['ngRoute']);
Chatbucket.config(function($routeProvider) {
	$routeProvider
	
	.when("/index",
	{
		templateUrl:"index.html",
		controller:'mainController'
	})
	
	/*.when("/viewAllBlogs",
	{
		templateUrl:"views/viewBlogs.html",
		controller:'viewBlogsController'
	})*/
	.when("/login",
	{
		templateUrl:"views/login.html",
		controller:'loginController'
	})
	
	.when("/register",
	{
		templateUrl:"views/register.html",
		controller:'registerController'
	})
	.when("/about",
	{
		templateUrl:"views/about.html",
		controller:'aboutController'
	})
	.when("/forum",
	{
		templateUrl:"views/forum.html",
		controller:'forumController'
	})
	.when("/services",
	{
		templateUrl:"views/services.html",
		controller:'servicesController'
	}).when("/blog",
	{
		templateUrl:"views/blog.html",
		controller:'blogController'
	}).
	when("/logout",
			{
				templateUrl:"views/logout.html",
				controller:'logoutController'
			})
	.when("/userHome",
	{
		templateUrl:"views/userHome.html",
		controller:'userHomeController'
	})
	.when("/jobs",
	{
		templateUrl:"views/jobs.html",
		controller:'jobsController'
	})
	.when("/adminBlog",
	{
		templateUrl:"views/adminBlog.html",
		controller:'adminBlogController'
	})
	.when("/adminHome",
	{
		templateUrl:"views/adminHome.html",
		controller:'adminHomeController'
	})
	.when("/adminJobs",
	{
		templateUrl:"views/adminJobs.html",
		controller:'adminJobsController'
	})
	.when("/viewBlogs",
	{
		templateUrl:"views/viewBlogs.html",
		controller:'viewBlogsController'
	})
	.when("/viewForum",
	{
		templateUrl:"views/viewForum.html",
		controller:'viewForumController'
	})
	.when("/adminForum",
	{
		templateUrl:"views/adminForum.html",
		controller:'adminForumController'
	})
	
});
Chatbucket.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);

Chatbucket.service('fileUpload', ['$http','$location', function ($http,$scope,$location) {
    this.uploadFileToUrl = function(file, uploadUrl,username,password,address,dob){
       var fd = new FormData();
       fd.append('file', file);
       fd.append('username',username);
       fd.append('password',password);
       fd.append('address',address);
       fd.append('dob',dob);
    console.log("fd:"+fd)
       $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })
    
       .success(function(){
    	   $scope.message="registered! you can login now!!";
    	    $scope.username="";
    	    $scope.password="";
    	  
    	  
    	   
       })
    
       .error(function(){
       });
    }
 }]);
Chatbucket.controller('registerController', ['$scope', 'fileUpload', function($scope,fileUpload){
    $scope.register = function(){
       var file = $scope.myFile;
       var username=$scope.username;
       var password=$scope.password;
       var address=$scope.address;
       var dob=$scope.dateofbirth;
       console.log("username"+username);
       console.log('file is ' );
       console.dir(file);
       var uploadUrl = "http://localhost:2020/Chatbucket/fileUpload";
       fileUpload.uploadFileToUrl(file, uploadUrl,username,password,address,dob);
       $scope.username="";
	    $scope.password="";
	    $scope.address="";
	    $scope.dateofbirth="";
    };
 }]);
Chatbucket.controller('loginController',['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope)		
                                		{
                                	
                                             console.log(" login controller");
                                			 $scope.login=function()
                                			 {
                                				  var loginData={
                                						  username:$scope.username,	
                                							password:$scope.password,  
                                				  }
                                 $http.post('http://localhost:2020/Chatbucket/authenticate',loginData).then(function (response) {
                                	 console.log("result   data:"+response.data);
                                	 var r=response.data.toString();
                                	 console.log("response:"+r);
                                     
                                		if(r==1)
                                			{
                                			$rootScope.blog=true;
                                			$rootScope.forum=true;
                                			$rootScope.jobs=true;
                                			$rootScope.login=false;
                                			$rootScope.register=false;
                                			$rootScope.services=false;
                                			$rootScope.about=false;
                                			$rootScope.home=false;
                                			$rootScope.logout=true;
                                			$rootScope.chat=true;
                                			$rootScope.viewBlogs=true;
                                			console.log('logout:'+$rootScope.logout);
                                			console.log("jaffa:"+response.data);
                                			/* var path="/userHome?username="+$scope.username;
                                			$location.path(path);*/
                                			console.log("uname from root scope:"+$rootScope.uname);
                                			$rootScope.uname=$scope.username;
                                			console.log("uname:"+$rootScope.uname);
                                			$location.path("/userHome");
                                			}
                                		if(r==0)
                                			{
                                			$scope.username="";
                                			$scope.password="";
                                			$scope.message="username/password incorrect";
                                			$location.path('/login');
                                			}
                                		if(r==2)
                                		{
                                			$rootScope.login=false;
                                			$rootScope.register=false;
                                			$rootScope.services=false;
                                			$rootScope.about=false;
                                			
                                			$rootScope.home=false;
                                			$rootScope.adminBlog=true;
                                			$rootScope.users=true;
                                			$rootScope.registeredUsers=true;
                                			$rootScope.logout=true;
                                			
                                		$location.path('/adminHome');
                                		}
                                		
                                 });  
                                			 }
                                		}]
                                		);

Chatbucket.controller('userHomeController',function($scope)		
		{
			$scope.message="you are in userhome page";
		}
		);
Chatbucket.controller('adminHomeController',function($scope)		
		{
			$scope.message="you are in adminHome page";
		}
		);




Chatbucket.controller("blogController",function($scope,$http,$rootScope)	
		{	
	$rootScope.forum=true;
	$rootScope.jobs=true;
	$rootScope.adminblog=false;
	$rootScope.adminforum=false;
	$rootScope.register=false;
	$rootScope.services=false;
	$rootScope.about=false;
	$rootScope.home=false;
	$rootScope.addjobs=false;
	$rootScope.viewBlogs=true;
	$rootScope.login=false;
	$rootScope.jobs=false;
	$rootScope.blogs=true;
	$rootScope.chat=true;
	$rootScope.logout=true;

	             console.log("I am in blog controller");
	             console.log("username in blog controller:"+$rootScope.uname);
	
			 $http.get("http://localhost:2020/Chatbucket/viewMyBlogs/"+$rootScope.uname)
			    .then(function (response) {$scope.blogs = response.data;});
			
			$scope.newBlog={};
			console.log("In Controller");
			$scope.addBlog=function(newBlog)
			{				
				var dataObj = {
		    			blogTitle:$scope.blogTitle,
		    			blogDescription:$scope.blogDescription,
		 				category:$scope.category,
		 				postedBy:$rootScope.uname
		 		};
				console.log("title:"+dataObj);
				 var res = $http.post('http://localhost:2020/Chatbucket/addBlog',dataObj);
				 $http.get("http://localhost:2020/Chatbucket/viewMyBlogs/"+$rootScope.uname)
			 	    .then(function (response) {$scope.blogs = response.data;});
			 		res.success(function(data, status, headers, config) {
			 			$scope.message = data;
			 			console.log("status:"+status);
			 		});
			 		 
			};
			$scope.editBlog=function(blog)
			{
				console.log("inside editblog");
				console.log("blog:"+blog);
				$scope.blogDataToEdit=blog;
			}
			$scope.saveEdit=function()
			{
				var dataObj = {
		    			blogTitle:$scope.blogDataToEdit.blogTitle,
		    			blogDescription:$scope.blogDataToEdit.blogDescription,
		 				category:$scope.blogDataToEdit.category,
		 				blog_id:$scope.blogDataToEdit.blog_id
		 		};
				$http.put('http://localhost:2020/Chatbucket/updateBlog', dataObj);
				 $http.get("http://localhost:2020/Chatbucket/viewMyBlogs/"+$rootScope.uname)
		 	    .then(function (response) {$scope.blogs = response.data;});
			}
			$scope.deleteBlog=function(blogDataToEdit)
			{
				console.log("delete blog called");
				blog_id:$scope.blogDataToEdit.blog_id;
				console.log("blog_id:"+blogDataToEdit.blog_id);
				$http['delete']('http://localhost:2020/Chatbucket/deleteBlog/'+blogDataToEdit.blog_id);
				 $http.get("http://localhost:2020/Chatbucket/viewMyBlogs/"+$rootScope.uname)
			 	    .then(function (response) {$scope.blogs = response.data;});
			}
			
			
			
		}

		);

Chatbucket.controller('viewBlogsController',function($scope,$rootScope,$http)		
		{ 
	
		
		$rootScope.userjobs=true;
		$rootScope.adminblog=false;
		$rootScope.adminforum=false;
		$rootScope.register=false;
		$rootScope.home=false;
		$rootScope.addjobs=false;
		$rootScope.login=false;
		$rootScope.jobs=false;
		$rootScope.blogs=true;
		$rootScope.forum=true;
		$rootScope.logout=true;
     	$rootScope.forum=true;
	
     	console.log("username in allmyblog controller:"+$rootScope.uname);
		 $http.get("http://localhost:2020/Chatbucket/viewAllBlogs")
		    .then(function (response) {
		    	
		    	$scope.blogs = response.data;
		    	
		    	console.log("data:"+response.data);
		    });
	});
Chatbucket.controller("adminBlogController",function($scope,$http,$rootScope)	
		{	
	$rootScope.login=false;
	$rootScope.register=false;
	$rootScope.services=false;
	$rootScope.about=false;
	$rootScope.home=false;
	$rootScope.adminBlog=true;
	$rootScope.userHome=true;
	$rootScope.registeredUsers=true;
	$rootScope.logout=true;
	$rootScope.adminJobs=true;
	console.log("i am in adminblog controller");
	console.log("after this");
			 $http.get("http://localhost:2020/Chatbucket/viewAllBlogs")
			    .then(function (response) {
			    	
			    	$scope.blogs = response.data;
			    	
			    	console.log("data:"+response.data);
			    });
			 
			 $scope.appdisapp=function(adminBlog)
				{
					console.log("inside appdisappblog");
					console.log("adminBlog:"+adminBlog);
					$scope.blogstatus=adminBlog;
					
				}
				$scope.approveBlog=function()
				{
					console.log("postedBy:"+$scope.blogstatus.postedBy);
					console.log("in approveblog");
					var edit=
						{
							blog_id:$scope.blogstatus.blog_id,
							category:$scope.blogstatus.category,
							blogTitle:$scope.blogstatus.blogTitle,
							blogDescription:$scope.blogstatus.blogDescription,
							postedBy:$scope.blogstatus.postedBy,
							status:true
						}
					
					$http.put("http://localhost:2020/Chatbucket/updateBlog",edit);
					 $http.get("http://localhost:2020/Chatbucket/viewAllBlogs")
					    .then(function (response) {
					    	
					    	$scope.blogs = response.data;
					    	
					    	console.log("data:"+response.data);
					    });
				}
				$scope.disapproveBlog=function()
				{
					console.log("postedBy:"+$scope.blogstatus.postedBy);
					console.log("in disapproveblog");
					var edit=
						{
							blog_id:$scope.blogstatus.blog_id,
							category:$scope.blogstatus.category,
							blogTitle:$scope.blogstatus.blogTitle,
							blogDescription:$scope.blogstatus.blogDescription,
							postedBy:$scope.blogstatus.postedBy,
							status:false
						}
					$http.put("http://localhost:2020/Chatbucket/updateBlog",edit);
					 $http.get("http://localhost:2020/Chatbucket/viewAllBlogs")
					    .then(function (response) {
					    	
					    	$scope.blogs = response.data;
					    	
					    	console.log("data:"+response.data);
					    });
				}
				
			 
		});
			 
			
		
Chatbucket.controller('logoutController',function($scope,$rootScope)		
		{
			console.log("logout controller called");
			$rootScope.login=true;
			$rootScope.register=true;
			$rootScope.services=true;
			$rootScope.about=true;
			$rootScope.home=true;
			$rootScope.blog=false;
			$rootScope.viewBlogs=false;
			$rootScope.forum=false;
			$rootScope.jobs=false;
			$rootScope.logout=false;
			$rootScope.chat=false;
			$rootScope.adminBlog=false;
			$rootScope.userHome=false;
		}
		);
Chatbucket.controller("adminJobsController",function($scope,$http,$rootScope)
		{
			 $rootScope.login=false;
				$rootScope.register=false;
				$rootScope.services=false;
				$rootScope.about=false;
				$rootScope.home=false;
				$rootScope.adminBlog=true;
				$rootScope.users=true;
				$rootScope.registeredUsers=true;
				$rootScope.logout=true;
				$rootScope.adminJobs=true;
			  console.log("you are in adminjobs");
			  console.log("inside job controller");
			    $http.get("http://localhost:2020/Chatbucket/viewAllJobs")
			    .then(function (response) {$scope.jobs = response.data;});
			   
		});
Chatbucket.controller('jobsController',function($scope,$http,$rootScope)		
		{
	console.log("inside job controller");
    $http.get("http://localhost:2020/Chatbucket/viewAllJobs")
    .then(function (response) {$scope.jobs = response.data;});
    
    $scope.applyJob=function()
    {
    	 console.log("applyJob function called");
    	 var jobData={
           jobId:$scope.jobId,
    	 registrationNumber:$scope.registrationNumber,
    	 studentId:$scope.studentId,
    	 certificateNumber:$scope.certificateNumber	
    	 };
    	 var res = $http.post('http://localhost:2020/Chatbucket/registerJob',jobData);
    }
		}
       
		);





