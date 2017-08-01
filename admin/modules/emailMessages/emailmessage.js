'use strict';
define(['angular'],
       function (angular) {
    angular.module('myApp.emailmessageView', [])
    .controller('emailmessageCtrl', emailmessageCtrl)
   
    


    function emailmessageCtrl($http,DTOptionsBuilder,DTColumnDefBuilder) {
        
      var vm=this;
      vm.mailmessageList = [];
      vm.mailmessage = null;
      vm.isCreation = false;
          
        console.log("emailmessageCtrl");
        
        vm.dtOptions = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDisplayLength(10)
        .withOption('responsive', true);

         vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1).notSortable()
    ];
        

            $http.get('/api/messages/findAll').success( function(mailmessages) {
        	   vm.mailmessageList= mailmessages;
             });

    

        
         this.add = function()
        {
            console.log("add");
            console.log(this.messageMail);
           
           
            var obj =vm.mailmessage;
             $http.post('/api/messages/add',obj).success( function(mailmessage) {
                vm.mailmessageList.push(mailmessage);
        	  
               vm.mailmessage = null;
        	 // console.log("Added:" +church);
           }).error(function(data, status)
                     {
                 console.log("Error:" +data +" " +status);
             });

        }
         
         
    this.update =function()
        {
             //vm.church =vm.churchlist[index];
              var obj = vm.mailmessage;
             $http.put('/api/messages/add/',obj).success( function(message) {
        	   console.log("mailmessages updated");

                  vm.mailmessageList.splice(vm.editIndex, 1);
                  vm.mailmessageList.push(message);
                  vm.mailmessage  = null;
             }).error(function(data, status){
                 console.log("Error:" +data +" " +status);
                 
             });
        }

        this.remove =function(index)
        {
               var mailmessagesid=vm.mailmessageList[index]['@rid'].substring(1);
                   $http.delete('/api/messages/add/'+mailmessagesid)
	                    .then(function(response) {
	                  	vm.mailmessageList.splice(index, 1);
	                    	vm.mailmessages= null;
	                      // assumes if ok, response is an object with some data, if not, a string with error
	                      // customize according to your api
	                    });
        }
          
          
        this.close =function()
        {
           vm.mailmessage =null;
        }
        
            this.modify =function(index)
        {
             //vm.church =vm.churchlist[index];

               var mailmessageid=vm.mailmessageList[index]['@rid'].substring(1,vm.mailmessageList[index]['@rid'].length);
               $http.get('/api/messages/find/'+mailmessageid).success( function(result) {
                   
                  vm.mailmessage = result[0];
                   
        	   //vm.church  = result[1];
               //vm.youthleader=result[0];
                 vm.submitLabel="Save";
                 vm.isCreation=false;
                   vm.editIndex=index;
             });
        }


    
        
        this.showMessageView =function()
        {
           vm.mailmessage ={};
           vm.submitLabel="Submit";
           //$scope.submitLabel="Submit";
           vm.isCreation = true;
        }
      
          
          
    }
    

  
});



