angular.module('app',[])
.controller('mainCtrl',mainCtrl)
.directive('avatar',avatarDirective);

function mainCtrl($scope){
  $scope.users=[{
    name:'Mikey Murphy',avatarUrl:'https://pbs.twimg.com/profile_images/621816592519688192/U8sbRNik.jpg'
  }];

  $scope.addNew=function(user){
    $scope.users.push({
      name:user.name,
      avatarUrl:user.url
    });
    user.name='';
    user.url='';
  };
}

function avatarDirective(){
  return{
    scope:{
      user:'='
    },
    restrict:'E',
    template:(
      '<div class="Avatar">'+
      '<img ng-src="{{user.avatarUrl}}" />'+
      '<h4>{{user.name}}</h4>'+
      '</div>'
    ),
    link: link
  };

  function link(scope){
    if(!scope.user.avatarUrl){
      scope.user.avatarUrl='http://thealmanac.org/assets/img/default_avatar.png';
    }
  }
}
