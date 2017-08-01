'use strict';
define(['angular'],
       function (angular) {
    angular.module('myApp.logonView', [])
    .controller('logonCtrl', logonCtrl)




    function logonCtrl($scope,$http) {
        
      let vm=this;
      vm.person=null;
      vm.logonuser=null;
        vm.authenticated = false;
        vm.formlogon={};
        vm.formlogon.authError = false;

       
       console.log("logonCtrl");


         this.logon = function()
        {
               console.log("logon try"); 
              $http.post('/api/userAdmin/findAdmin',vm.objSingleStore)
                  .success( function(church) {        
                   vm.authenticated = true;
              }).error(function(data,status){
                       console.log(data +' '+status);  
                    vm.objSingleStore.username = null;
                   vm.objSingleStore.password = null;
                  vm.formlogon.authError=true;
              });             
        }  
         
    }  
});



