define(['./app'], function(app) {
    'use strict';
    return app.config(function($stateProvider) {
        $stateProvider.state('churchState',{
            url: '/church',
            templateUrl: 'modules/church/churchcreate.html',
            controller:'ChurchCtrl'
        }),
       $stateProvider.state('registerUserViewState',{
            url: '/registerView',
            templateUrl: 'modules/registerUserView/registerUserView.html',
            controller:'registerUserViewCtrl'
        })
      ,
       $stateProvider.state('correspondenceState',{
            url: '/correspondenceView',
            templateUrl: 'modules/emailMessages/emailmessage.html',
            controller:'emailmessageCtrl'
        })    
      ,  
        $stateProvider.state('transportState',{ 
                url: '/transport', 
                templateUrl: 'modules/transport/transport.html', 
                controller:'transportCtrl' 
            })  
        ,
    $stateProvider.state('tshirtState',{ 
                url: '/tshirt', 
                templateUrl: 'modules/tshirt/tshirt.html', 
                controller:'tshirtCtrl' 
            })    
        })     
        
});