var app = window.angular.module('TabsApp', [])
app.factory('pokemonFetcher', pokemonFetcher)
app.controller('TabsCtrl', TabsCtrl)

function pokemonFetcher ($http) {

  var API_ROOT = 'pokemon'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    },
    search: function (name, building, floor, wifi, cell, light){
      return $http
      .search(API_ROOT)
      .then(function (resp) {
        return resp.data
      })
    },
    post: function (formData) {
      return $http
         .post(API_ROOT,formData)
         .then(function (resp) {
           console.log("Post worked");
         })
    } 
  }
}

function TabsCtrl ($scope, pokemonFetcher) {
	$scope.tabs = [{
            title: 'Find a Study Spot',
            url: 'one.tpl.html'
        }, {
            title: 'Add a Study Spot',
            url: 'two.tpl.html'
        }, {
            title: 'Login',
            url: 'three.tpl.html'
    }];

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
  $scope.pokemon = []

  pokemonFetcher.get()
    .then(function (data) {
      $scope.pokemon = data
    })
  $scope.addPoki = function() {
      if ($scope.Name != null && $scope.Name != '') {
        var formData = {name:$scope.Name,building:$scope.Building,floor:$scope.Floor,wifi:$scope.Wifi,cell:$scope.Cell,light:$scope.Light};
        console.log(formData);
        pokemonFetcher.post(formData); // Send the data to the back end
        $scope.pokemon.push(formData); // Update the model
      }
    }
  $scope.search = function() {
    console.log("Search button worked");
    console.log("name: ",$scope.Name, "building: ",$scope.Building,"Floor: ",$scope.Floor,"Wifi: ",$scope.Wifi,"Cell service: ",$scope.Cell,"Natural lighting: ",$scope.Light);
    pokemonFetcher.search($scope.Name, $scope.Building, $scope.Floor, $scope.Wifi, $scope.Cell, $scope.Light)
//    var findSpots=db.collection('pokemon').find( { "name": "JKB" } );
//    pokemonFetcher.get(findspots
//    console.log(findSpots);
  }
}
