'use strict';
define(['angular','ngMessages'],
       function (angular){
    angular.module('myApp.churchcreate', [])
    .controller('ChurchCtrl', ChurchcreateCtrl)
    .factory('churchList', churchList);


  //  ChurchcreateCtrl.$inject = ['$scope','$http'];


     function churchList($http,vm)
    {
        var churchlist = {};

        churchList.getChurchList=function(id)
        {
            return $http.get('/api/church//Churchlist/'+id);
        }


        return churchlist;
    }


    function ChurchcreateCtrl($http,DTOptionsBuilder,DTColumnDefBuilder) {
        var vm=this;
        vm.provinces = [];
        vm.churchlist = [];
        vm.youthleader={};
        //vm.church.churchcontactno=[];
        vm.youthleader.contactno=[];
        vm.church = null;
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
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3).notSortable()
    ];


       /* vm.dtColumnDefs = [
              DTColumnDefBuilder.newColumnDef(0),
              DTColumnDefBuilder.newColumnDef(1),
              DTColumnDefBuilder.newColumnDef(2),
              DTColumnDefBuilder.newColumnDef(3).notSortable()
          ];*/

         /*$http.get('http://localhost:3000/province/findall').success( function(provinceList) {
        	    vm.provinces  = provinceList;
           });*/

       getProvince($http,vm);
       getChurchlist($http,vm);

      // vm.church.province = provinceCtrl.findall();


        console.log("ChurchcreateCtrl");
       // vm.churches=[];
        this.add = function()
        {
            console.log("add");
            console.log(this.church);
            if (this.church.address != null)
                {
                     this.church.address.replace(/(\r\n|\n|\r)/gm,"");
                }
           
            var obj =angular.toJson(this);
             $http.post('/api/church/add',obj).success( function(church) {
                 if (church["@class"] == 'church')
                     {
                          vm.churchlist.push(church[0]);
                     }else{
                          vm.churchlist.push(church[1]);
                     }
        	  
               vm.church = null;
        	 // console.log("Added:" +church);
           }).error(function(data, status)
                     {
                 console.log(data +" " +status);
             });

        }


         this.showCompanyView =function()
        {
           vm.church ={};
           vm.youthleader ={};
           vm.submitLabel="Submit";
           vm.isCreation = true;
        }
          this.close =function()
        {
           vm.church =null;
        }

           this.modifyChurch =function(index)
        {
             //vm.church =vm.churchlist[index];

               var churchid=vm.churchlist[index]['@rid'].substring(1,vm.churchlist[index]['@rid'].length);
               $http.get('/api/church/findSingle/'+churchid).success( function(result) {
                   
                   if (result[0]['@class'] =='church')
                       {
                           vm.church  = result[0];
                       }else{
                           vm.youthleader  = result[0];
                       }
                   
                   if (result.length > 1)
                      
                    if (result[1]['@class'] =='church')
                       {
                           vm.church  = result[1];
                       }else{
                           vm.youthleader  = result[1];
                       }
                   
        	   //vm.church  = result[1];
               //vm.youthleader=result[0];
                 vm.submitLabel="Save";
                 vm.isCreation=false;
                   vm.editIndex=index;
             });
        }

           this.updateChurch =function()
        {
             //vm.church =vm.churchlist[index];
              var obj =angular.toJson(this);
             $http.put('/api/church/add/',obj).success( function(church) {
        	   console.log("Church updated");

                  vm.churchlist.splice(vm.editIndex, 1);
                  vm.churchlist.push(vm.church);
                  vm.church  = null;
             });
        }

          this.removeChurch =function(index)
        {
               var churchid=vm.churchlist[index]['@rid'].substring(1);
                   $http.delete('/api/church/add/'+churchid)
	                    .then(function(response) {
	                  	vm.churchlist.splice(index, 1);
	                    	vm.church= null;
	                      // assumes if ok, response is an object with some data, if not, a string with error
	                      // customize according to your api
	                    });
        }
          
          
         this.addContactno = function()
        {
            console.log("addContactno");
             var continueError = false;
             var continueError2 = false;
           // console.log(vm.parent.contacttype);
            //console.log(vm.parent.contactnum);
             try{
                 vm.contacts.church.contacttype;
                 continueError = true;
                 vm.churchnumbertype.$error = false; 
             }catch(err)
             {
                vm.churchnumbertype={};
                vm.churchnumbertype.$error = true; 
             }
             
             try{
                vm.contacts.church.contactnum 
                 continueError2 = true;
                 vm.churchnumber.$error = false;  
             }catch(err)
                 {
                     vm.churchnumber={};
                    vm.churchnumber.$error = true;  
                 }
             
             
              if (continueError && continueError2)
             {

                 var contactnum = vm.formatCell(vm.contacts.church.contactnum);
                 var contacttype =  vm.contacts.church.contacttype
                 var contactdetail = {'contacttype':contacttype,'contactno':contactnum};
                 if (vm.church.churchcontactno == null || vm.church.churchcontactno == '')
                     {
                         vm.church.churchcontactno = [];
                     }
                 vm.church.churchcontactno.push(contactdetail);

                 vm.contacts.church.contactnum = null;
                 vm.contacts.church.contacttype = "";
              }

        }
         
         
     this.removeContactno = function (index)
     {
         vm.church.churchcontactno.splice(index, 1);
  
     }
     
      this.removeContactLeader = function (index)
     {
         vm.youthleader.contactno.splice(index, 1);
     }
      
    
         
         
          this.addContactnoLeader = function()
        {
            console.log("addContactnoLeader");
           // console.log(vm.parent.contacttype);
            //console.log(vm.parent.contactnum);
         if (vm.contacts != null)
             {
                
                  var contactnum = vm.formatCell(vm.contacts.leader.contactnum);
             var contacttype =  vm.contacts.leader.contacttype
             
             var contactdetail = {'contacttype':contacttype,'contactno':contactnum};
              if (vm.youthleader.contactno == null)
                 {
                    vm.youthleader.contactno = [];
                 }
                 vm.youthleader.contactno.push(contactdetail);

                 vm.contacts.leader.contactnum = null;
                 vm.contacts.leader.contacttype = "";  
             }else{
                 vm.leadernumber={};
                 vm.leadernumber.$error = true;
             }
        }
          
     this.changeSelectContact = function()
     {
         vm.leadernumber.$error = false;
     }
     
      this.changeSelectContactTypeChurch = function()
     {
         vm.churchnumbertype.$error = false;
     }
          
          
    this.formatCell = function(cell)
    {
        var cellFormated = "";
        cellFormated = '('+cell.substr(0,3)+')' + cell.substr(3,3) +'-'+ cell.substr(6,4);
        return cellFormated; 
    }




    }


      function getProvince($http,vm) {

            console.log("get Province");
             $http.get('/api/province/findAll').success( function(provinceList) {
        	   vm.provinces= provinceList;
       });

      }

     function getChurchlist($http,vm) {

            console.log("get Churches");
             $http.get('/api/church/findAll').success( function(churclist) {
        	   vm.churchlist= churclist;
       });

     }







});



