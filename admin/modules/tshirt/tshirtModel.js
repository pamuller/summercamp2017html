 
'use strict';
define(['angular','ngMessages'],
       function (angular){
    angular.module('myApp.tshirtcreate', [])
    .controller('tshirtCtrl', createCtrl)
    .factory('tshirtList', tshirtList);

    function tshirtList($http,vm)
   {
       var objlist = {};

       objlist.gettshirtList=function(id)
       {
           return $http.get('/api/tshirt/tshirtlist/'+id);
       }

        return tshirtlist;
   }

   function createCtrl($http,DTOptionsBuilder,DTColumnDefBuilder) {
       var vm=this;
        vm.objSingleStore = null;
         vm.objList = null;
        vm.submitLabel="";
        vm.isCreation = false;
        vm.editIndex = 0;

        vm.dtOptions = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDisplayLength(10)
        .withOption('responsive', true);

         vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2).notSortable()
    ];

        console.log("createCtrl");
        this.add = function()
        {
            console.log("add");
            console.log(this.objSingleStore);      

            var obj =angular.toJson(this.objSingleStore);
             $http.post('/api/tshirt/add',obj).success( function(returnAdd) {
               vm.objList.push(returnAdd);
               vm.objSingleStore = null;
           }).error(function(data, status)
                     {
                 console.log(data +" " +status);
             });
        }

         this.showView =function()
        {
           vm.objSingleStore ={};
           vm.submitLabel="Submit";
           vm.isCreation = true;
        }
        
          this.closeView =function()
        {
           vm.objSingleStore =null;
        }

           this.modify =function(index)
        {
               var objid=vm.objList[index]['@rid'].substring(1,vm.objList[index]['@rid'].length);
               $http.get('/api/tshirt/findSingle/'+objid).success( function(result) {
                 vm.objSingleStore  = result[0];
                 vm.submitLabel="Save";
                 vm.isCreation=false;
                 vm.editIndex=index;
             });
        }

           this.update =function()
        {
              var obj =angular.toJson(this.objSingleStore);
             $http.put('/api/tshirt/add/',obj).success( function(result) {
        	    console.log(" updated");
                  vm.objList.splice(vm.editIndex, 1);
                  vm.objList.push(vm.objSingleStore);
                  vm.objSingleStore  = null;
             });
        }

          this.remove =function(index)
        {
               let objid=vm.objList[index]['@rid'].substring(1);
                   $http.delete('/api/tshirt/add/'+objid)
	                    .then(function(response) {
	                  	vm.objList.splice(index, 1);
	                    vm.objSingleStore= null;
	                    });
        } 
          
         this.getData = function ($http)
        {
             $http.get('/api/tshirt/findAll/').success( function(result) {
                 vm.objList  = result;
                 
             }).error(function(data,status)
                     {
                 console.log(status + " " + data);
                    });
        }
        
        vm.getData($http);
         
    }
     
});
