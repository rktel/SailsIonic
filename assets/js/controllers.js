angular.module('starter.controllers', [])
.controller('TabsCtrl',function ($timeout) {
	var tabs = this;
	
	//console.log('Ready');
})
.controller('DashCtrl', function($http) {
  var dash = this;
  dash.addPet = function (petName) {
  	(petName)?( $http.post('/pet/create?name='+petName).
  	  then(function (pet) {
	    dash.name = pet.data.name;
	    dash.id = pet.data.id;
	    dash.success = 'Store Success'
	}) ) 
	: ( dash.name = "", dash.id = "", dash.success = 'Store Fail' );
  }



})

.controller('ChatsCtrl', function($window,$http,$scope,$ionicModal) {
	
  var chats = this;

  $http.get('/pet').then(function (pets) {
    chats.pets = pets.data;//console.log(pets.data);
  });

  chats.alert= function (idPet,namePet) {
  	$http.get('/pet/destroy/'+idPet).then( function (pets) {
  		$window.location.reload(true); //alert(namePet+' Eliminado');
  	});
  	
  };
  
  chats.refresh = function() {
	$window.location.reload(true);

  }

 $ionicModal.fromTemplateUrl('templates/my-modal.ejs', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  });

  $scope.openModal = function(id_,petName_) {
    $scope.modal.show();
    console.log(id_);
    $scope.id = id_;
    $scope.petName = petName_;
  };
  $scope.alerta = function (newPet_) {
  	console.log($scope.id||null,newPet_);
  	$http.put('/pet/update/'+$scope.id+'?'+'name='+newPet_); ///pony/update/47?hobby=kickin
  	$window.location.reload(true);
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
})

.controller('AccountCtrl', function($scope,$ionicModal) {
	var account = this;
  account.settings =  true;

  $ionicModal.fromTemplateUrl('templates/my-modal.ejs', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  });

  $scope.openModal = function() {
    $scope.modal.show()
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };  

});