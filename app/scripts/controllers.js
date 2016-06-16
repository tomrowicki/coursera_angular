'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;

  $scope.showMenu = false;
  $scope.message = "Loading ...";
  menuFactory.getDishes().query(
    function(response) {
      $scope.dishes = response;
      $scope.showMenu = true;
    },
    function(response) {
      $scope.message = "Error: "+response.status + " " + response.statusText;
    });

    $scope.select = function(setTab) {
      $scope.tab = setTab;

      if (setTab === 2) {
        $scope.filtText = "appetizer";
      }
      else if (setTab === 3) {
        $scope.filtText = "mains";
      }
      else if (setTab === 4) {
        $scope.filtText = "dessert";
      }
      else {
        $scope.filtText = "";
      }
    };

    $scope.isSelected = function (checkTab) {
      return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function() {
      $scope.showDetails = !$scope.showDetails;
    };
  }])

  .controller('ContactController', ['$scope', function($scope) {

    // $scope.feedback = [];

    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

  }])

  .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {

    // $scope.sendFeedback = function() {
    //
    //   console.log($scope.feedback);
    //
    //   if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
    //     $scope.invalidChannelSelection = true;
    //     console.log('incorrect');
    //   }
    //   else {
    //     $scope.invalidChannelSelection = false;
    //     $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
    //     $scope.feedback.mychannel="";
    //     $scope.feedbackForm.$setPristine();
    //     console.log($scope.feedback);
    //   }
    // };
    $scope.sendFeedback = function () {
      feedbackFactory.getFeedback().save($scope.myFeedback);
      $scope.feedback = {firstname:"", lastname:"", areacode:"", telnum:"",emailid:"",agree:"",approveDatum:"Tel. or Email?",feedback:""};
      $scope.feedbackForm.$setPristine();
      console.log($scope.myFeedback);

      // for validation
      // console.log($scope.feedback);
      //
      //           if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
      //               $scope.invalidChannelSelection = true;
      //               console.log('incorrect');
      //           }
      //           else {
      //               $scope.invalidChannelSelection = false;
      //               feedbackFactory.getFeedback().save($scope.feedback);
      //               $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
      //               $scope.feedback.mychannel="";
      //               $scope.feedbackForm.$setPristine();
      //               console.log($scope.feedback);

    };

    // menuFactory.getDishes().query(
    //   function(response) {
    //     $scope.dishes = response;
    //     $scope.showMenu = true;
    //   },
    //   function(response) {
    //     $scope.message = "Error: "+response.status + " " + response.statusText;
    //   });


    //   // $scope.dish.comments.push($scope.mycomment);
    //
    // menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
    // $scope.commentsForm.$setPristine();
  }])

  .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

    $scope.dish = {};
    $scope.showDish = false;
    $scope.message="Loading ...";
    $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
    .$promise.then(
      function(response){
        $scope.dish = response;
        $scope.showDish = true;
      },
      function(response) {
        $scope.message = "Error: "+response.status + " " + response.statusText;
      }
    );
  }])

  .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {

    $scope.mycomment = {rating:5, comment:"", author:"", date:""};

    $scope.submitComment = function () {
      $scope.mycomment.date = new Date().toISOString();
      console.log($scope.mycomment);
      $scope.dish.comments.push($scope.mycomment);

      menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
      $scope.commentsForm.$setPristine();
      $scope.mycomment = {rating:5, comment:"", author:"", date:""};
    };
  }])

  // implement the IndexController and About Controller here
  .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function($scope, corporateFactory, menuFactory) {

    $scope.message="Loading ...";
    // get one staff member
    $scope.showLeader = false;
    $scope.chief = corporateFactory.getLeaders().get({id:3})
    .$promise.then(
      function(response){
        $scope.chief = response;
        $scope.showLeader = true;
      },
      function(response) {
        $scope.message = "Error: "+response.status + " " + response.statusText;
      }
    );
    // get culinary goody
    $scope.showDish = false;
    $scope.dish = menuFactory.getDishes().get({id:0})
    .$promise.then(
      function(response){
        $scope.dish = response;
        $scope.showDish = true;
      },
      function(response) {
        $scope.message = "Error: "+response.status + " " + response.statusText;
      }
    );
    // get promotion
    $scope.showPromotion = false;
    $scope.promotion = menuFactory.getPromotions().get({id:0})
    .$promise.then(
      function(response){
        $scope.promotion = response;
        $scope.showPromotion = true;
      },
      function(response) {
        $scope.message = "Error: "+response.status + " " + response.statusText;
      }
    );

  }])

  .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

    $scope.message="Loading ...";
    $scope.showLeaders = false;
    corporateFactory.getLeaders().query(
      function(response){
        $scope.leaders = response;
        $scope.showLeaders = true;
      },
      function(response) {
        $scope.message = "Error: "+response.status + " " + response.statusText;
      });

    }])
