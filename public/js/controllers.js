'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });
    socket.on('send:lastname', function (data) {
        $scope.lastname = data.lastname;
      });
    socket.on('send:tweets', function (data) {
        $scope.tweets = data.tweets;
      });
    socket.on('send:tweetuser', function (data) {
        $scope.tweetuser = data.tweetuser;
      });
    socket.on('send:time', function (data) {
      $scope.time = data.time;    
    });
    
  }).
  controller('MyCtrl1', function ($scope, socket) {
    socket.on('send:time', function (data) {
      $scope.time = data.time;    
    });
    socket.on('send:tweets', function (data) {
        $scope.tweets = data.tweets;
      });
    
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  });
