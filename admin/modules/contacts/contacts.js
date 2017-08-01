'use strict';
define(['angular'],
       function (angular) {
   angular.module('myApp.contacts', [])
    .controller('contactsCtrl', contactsCtrl)
  


    function contactsCtrl($scope,$http) {
        let vm=this;
        
        console.log("contactsCtrl");
        vm.contactdetails = [];
       
      
        
          this.addContactno = function()
        {
            console.log("addContactno");
           // console.log(vm.parent.contacttype);
            //console.log(vm.parent.contactnum);
             
             var contactdetail = {'contacttype':vm.contacts.contacttype,'contactno':vm.contacts.contactnum};
             vm.contactdetails.push(contactdetail);

        }

    }
    
    
     


});