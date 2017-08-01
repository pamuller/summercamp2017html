define(['./app'], function(app) {
    'use strict';
    return app.config(function($stateProvider,$urlRouterProvider) {      
       $stateProvider.state('registerUserState',{
            url: '/register',
            templateUrl: 'modules/registerUser/registerUser.html',
            controller:'registerUserCtrl'
        })
       
       $urlRouterProvider.otherwise("/register") 
        
    })
});