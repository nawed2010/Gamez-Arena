var mainApp = angular.module('mainApp',[]);


//Controller

mainApp.controller('MainController',function($scope, serviceApi){
    
    var originalGamesList = null;

    var gamesListPromise = serviceApi.getGamesList();
        
    gamesListPromise.then(function(successResponse){
        
        console.log("Success from controller: ",successResponse);
        
        originalGamesList = successResponse.data;
        originalGamesList.splice(0,1);
        $scope.gamesList = originalGamesList;
    
    },function(errorResponse){
        console.log("Error from controller: ",errorResponse);
    });
    
    //For returning random color
    $scope.randomColor = function (num){
        
        switch(num) {
            
            case 0 : return "lazur";
            case 1 : return "red";
            case 2 : return "navy";
            case 3 : return "yellow";
            
        }
        
    }
    
    $scope.sortByPlatform = function(){
        
        var sortByPlatformList = originalGamesList;
        
        sortByPlatformList.sort(function(a, b){
           if(a.platform < b.platform) return -1;
           if(a.platform > b.platform) return 1;
           return 0;
        });
        
        $scope.gamesList = sortByPlatformList;
        
    }
    
    $scope.sortByScore = function(){
        
        var sortByScore = originalGamesList;
        
        sortByScore.sort(function(a, b){
           if(a.score > b.score) return -1;
           if(a.score < b.score) return 1;
           return 0;
        });
        
        $scope.gamesList = sortByScore;
        
    }
    
     $scope.sortByGenre = function(){
        
        var sortByGenre = originalGamesList;
        
        sortByGenre.sort(function(a, b){
           if(a.genre < b.genre) return -1;
           if(a.genre > b.genre) return 1;
           return 0;
        });
        
        $scope.gamesList = sortByGenre;
        
    }
    
    $scope.sortByEditorsChoice = function(){
        
        var sortByEditorsChoice = originalGamesList;
        
        sortByEditorsChoice.sort(function(a, b){
           if(a.editors_choice > b.editors_choice) return -1;
           if(a.editors_choice < b.editors_choice) return 1;
           return 0;
        });
        
        $scope.gamesList = sortByEditorsChoice;
        
    }

});

//Service

mainApp.factory("serviceApi",function($http){

    
    getGamesList = function(){
        
        var url = "file:///Users/nawed2010/Downloads/Digitopia/First%20Problem/api.json";
        
        
        var gamesList = $http.get(url).success(function(response){
            
            console.log("Success from sercice: ",response);
        
        }).error(function(response){
            
            console.log("Error from service: ",response);
        
        });
        
        return gamesList;
        
    };
    
    //Exposed Service
    return{
        getGamesList : getGamesList
    }

});


//Filter

mainApp.filter('searchFor', function(){
    return function(arr, searchString){
        if(!searchString){
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();
        angular.forEach(arr, function(item){
            if(item.title.toLowerCase().indexOf(searchString) !== -1){
            result.push(item);
         }
        });
        return result;
    };
});