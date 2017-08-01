'use strict';
define(['angular','province'],
       function (angular) {
    angular.module('myApp.registerUser', ['myApp.province'])
    .controller('registerUserCtrl', registerUserCtrl)
    .constant('serverURl', '/api')
    .directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
  }])



    function registerUserCtrl($scope,$http,provinceList,$anchorScroll,serverURl) {
 
      var vm=this;
      vm.provinces=[];
      vm.parent={};
      vm.user ={'gender':'male'};
      vm.parent.contactdetails=[];
      vm.perantGardians=[];
      vm.fileList=[];
      vm.medicalinfo={};
      vm.transport={"required":false};
      vm.tshirt={"required":false};
      vm.medicalinfo.allergies=[];
      vm.medicalinfo.histories=[];
      vm.medicalinfo.medications=[];
      vm.medicalaidinfo={"hasmedicalAid":false};
      vm.medicalhistoryerror=false;
      vm.allergieserror=false;
      vm.parentError=false; 
      vm.parentInfoError =true;    
      vm.contactnumberError=false; 
      vm.contacttypeError = false;    
      vm.parentListError = false;
      vm.parentrelationError=false;
      vm.transportList=[];
      vm.showSubmit = false;
      vm.registrered = false;
      vm.submitchecked = true;
      vm.showOtherChurch =false
      vm.SubmitLabel="Submit";

      //vm.provinces = provinceList.provincelist() ;
      // getProvince($http,vm);
       vm.showInstructions=true;
       getProv(vm,provinceList) ;



        console.log("registerUserCtrl");
       // vm.churches=[];
        this.add = function()
        {
            vm.SubmitLabel="Processing";
            vm.submitchecked = true;  
            console.log("add");
            console.log(this);
             $http.post(serverURl+'/registeruser/add',this).success( function(regiserUser) {
               vm.regiserUser = regiserUser;
               vm.changTabInstructions();
                 vm.refnumber = regiserUser.refnumber;
                 vm.registrered = true;
                 vm.giveConcent = false;

           }).error(function(data, status) {
            
                 alert(data.error);
                 vm.submitchecked = false; 
                 vm.SubmitLabel="Submit";
            })
             ;
        }


         this.addContactno = function()
        {
            console.log("addContactno");
            console.log(vm.parent.contacttype);
            console.log(vm.parent.contactnum);
             
             if (vm.parentForm.contacttype.$valid && vm.parentForm.contactnum.$valid)
           {
                     
             var contacttype = vm.parent.contacttype;
             var contactnum = vm.parent.contactnum;
             var contactdetail =  {'contacttype':contacttype,'contactno':contactnum};
             vm.parent.contactdetails.push(contactdetail);

             vm.parent.contacttype = null;
             vm.parent.contactnum = null;
              vm.parentError=false;     
               vm.contactnumberError=false;
               vm.contacttypeError=false;
               
             }else{
               
                 if (! vm.parentForm.contactnum.$valid)
                     {
                          vm.contactnumberError=true; 
                     }
                 if(! vm.parentForm.contacttype.$valid)
                     {
                          vm.contacttypeError = true;  
                     }
                  
     
                 
                 }
             
             
            
            // vm.parent.contactdetails = [];


        }


        this.removeContactno = function(index){
            console.log("remove called");
            console.log(vm.parent.contactdetails.indexOf(index));
            var rmindex = vm.parent.contactdetails.indexOf(index)
            if (rmindex > -1)
                {
                    vm.parent.contactdetails.splice(rmindex,1);
                }
        }

        this.addPerent = function (){
            console.log("addParent entered");
            var  firstname = vm.parent.firstname;
             var  lastname = vm.parent.lastname;
            var  relation = vm.parent.relation;
            
            
            if (vm.parent.contactdetails.length > 0 && vm.parentForm.$valid)
                {
                     var  contactdetails = vm.parent.contactdetails;
                var perantGardian = {'firstname':firstname,
                                     'lastname': lastname,
                                     'relation':relation,
                                     'contactdetails':contactdetails
                                    };
                vm.perantGardians.push(perantGardian);
                vm.parent.contactdetails = [];
                vm.parent.firstname = null;
                vm.parent.lastname = null;
                vm.parent.relation = null;
                vm.parentListError = false;
                    
                
                    if (vm.perantGardians.length >= 2)
                        {
                            vm.parentInfoError=false; 
                        }else{
                            vm.parentInfoError=true; 
                            vm.parentError=true;  
                        }
                    
                }else{
                      
                     vm.parentInfoError=true;
                     vm.parentForm.parentname1.$setTouched();
                     vm.parentForm.parentsurname.$setTouched();
                     vm.parentForm.parentrelation.$setTouched();
                    
                    if(vm.parent.contactdetails.length == 0)
                        {
                            vm.parentError = true;
                        }
                    
                }
            
            

        }

        this.removePerent = function(index){
            vm.perantGardians.splice(index,1);
        }



         this.addAllergies = function()
         {
              var allergy={};
             if(vm.allergy == "Other" || vm.allergy == "Food")
                 {
                     var lb = vm.allergy +":" +vm.allergiesother ;
                     allergy={'allergy':lb};
                 }else{
                      allergy={'allergy':vm.allergy};
                 }

             vm.medicalinfo.allergies.push(allergy);
             vm.allergieserror=false;

         }

         this.addMedication =function()
         {
              var medication={};

              medication={'medicationname':vm.medication};

             vm.medicalinfo.medications.push(medication);
             vm.medication = null;


         }


         this.addMedicalhistory = function()
         {
              var medicalhistory={};

             if (vm.medicalhistory == "Other")
                 {
                     var medicalhistory={'history':vm.medicalother};
                 }else{
                      var medicalhistory={'history':vm.medicalhistory};
                 }



             vm.medicalinfo.histories.push(medicalhistory);
             vm.medicalhistoryerror=false;

         }


         this.getChurchListByProvince = function(province)
        {
               console.log("get Churches");
             var provinceSelected = province;
             var provinceid = provinceSelected['@rid'].substring(1,provinceSelected['@rid'].length)
              $http.get(serverURl+'/church/findByProvince/'+provinceid).success( function(churchlist) {
                
                vm.churchlist= churchlist;
              });
        }

         this.selectChurch = function()
         {
             if(vm.church.churchname == 'Not listed')
            {
                     vm.showOtherChurch = true;
            }
         }

         this.getTransport = function()
        {
              console.log("get getTransport");
              $http.get(serverURl+'/transport/findall').success( function(transportList) {
                vm.transportList= transportList;
              });
        }

         this.getTshirt= function()
        {
              console.log("get getTransport");
              $http.get(serverURl+'/tshirt/findall').success( function(transportList) {
                vm.tshirtList= transportList;
              });
        }



          this.addEmergincyContact = function(){
            console.log("add emergincy contact");
            var emergencyContact={'name':vm.emerigency.name,
                                  'telephone':vm.emerigency.telephone
                                 };
            vm.emergencyContacts.push(emergencyContact);
        }

        this.removeEmergencycontact = function(index){
            vm.emergencyContacts.splice(index,1);
        }
        
        
        this.removeMedicalHistory = function(index)
        {
             vm.medicalinfo.histories.splice(index,1);      
        }
        
         this.removeAllergy = function(index)
        {
             vm.medicalinfo.allergies.splice(index,1);      
        }
         
         this.removeMedication = function(index)
        {
             vm.medicalinfo.medications.splice(index,1);      
        } 
         
        this.changeTab = function ()
        {
            console.log("change tab called");
            vm.showCamper=false;
            vm.showMedical=false;
            vm.showOther=false;
            vm.showParent=false;
            vm.showUpload=false;
            vm.showInstructions=false;

        }

        this.uploadFile = function ()
        {
             var fd = new FormData();
            fd.append('recfile', vm.myFile);
           // vm.fileList.push(vm.myFile.name)
            $http.post(serverURl+'/registeruser/addDoc', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type':undefined}
            })
            .success(function(){
            })
            .error(function(){
            });
        }

         this.getFile = function ()
        {
            // var fd = new FormData();
           // fd.append('recfile', vm.myFile);
           // vm.fileList.push(vm.myFile.name)
            $http.get(serverURl+'/registeruser/getDoc')
            .success(function(provinceList){
                console.log('getfile')
                // window.open(provinceList[0]);
                 var docWindow = window.open('','title');
                docWindow.document.open('application/pdf');
                document.write(provinceList[0]);
                docWindow.document.close();
            })
            .error(function(){
                console.log('errorget')
            });
        }


         this.validateCamper =function()
         {
            var validd = vm.formCamperInfo.$valid;
              if (vm.formCamperInfo.$valid)
              {
                    vm.changeTab();
                    vm.showParent=true;

                $("#liCampInfo").removeClass("active");
                $("#liParent").addClass("active");

              }else{
                  vm.formCamperInfo.$invalid;
                  //$location.hash('firstname');
                  $anchorScroll();
              }
         }


         this.changTabInstructions = function()
         {
             vm.changeTab();
             vm.showInstructions=true;

            $("#liCampInfo").removeClass("active");
               $("#liParent").removeClass("active");
               $("#liMedical").removeClass("active");
               $("#liAdditional").removeClass("active");
              $("#liDocuments").removeClass("active");

              $("#liInstructions").addClass("active");


         }

         this.validateConcent = function()
         {
                    vm.changeTab();
                    vm.showCamper=true;
             $("#liInstructions").removeClass("active");
              $("#liCampInfo").addClass("active");
         }


         this.validateParent = function()
         {

             if (vm.perantGardians.length < 2)
                 {
                    vm.parentForm.parentname1.$setTouched();
                    vm.parentForm.parentsurname.$setTouched();
                     vm.parentListError = true;
                    //vm.parentForm.parentrelation.$setTouched();

                 }else{
                      vm.changeTab();
                      vm.showMedical=true;
                     $("#liParent").removeClass("active");
                     $("#liMedical").addClass("active");
                 }

         }
         
         this.medicalerror = function()
         {
             vm.medicalhistoryerror= false;
         }
         
          this.allergyerror  = function()
         {
             vm.allergieserror= false;
         }

        this.printPage = function()
        {
            window.print();
        }

         this.validateMedical = function()
         {
                if (vm.medicalinfo.histories.length == 0)
                    {
                         
                         vm.medicalhistoryerror=true;
                          $anchorScroll();   
                    }else if(vm.medicalinfo.allergies.length == 0)
                    {
                        vm.allergieserror=true;
                          $anchorScroll();   
                    }else if (! vm.meicalForm.$valid)
                    {
                        vm.meicalForm.MedicalAidName.$setTouched();
                        vm.meicalForm.MainMemberName.$setTouched();
                        vm.meicalForm.MedicalAidNo.$setTouched();  
                        $anchorScroll();   
                        
                    }else if(vm.meicalForm.$valid)
                           {
                            vm.changeTab();
                             vm.showOther=true;
                             vm.showSubmit = true;
                             vm.submitchecked=false;
                             $("#liMedical").removeClass("active");
                             $("#liAdditional").addClass("active");
                        }

         }

         vm.getTransport();
         vm.getTshirt();


    }

    function getProvince($http,vm) {

            console.log("get Province");
             $http.get('/api/province/findAll').success( function(provinceList) {
        	   vm.provinces= provinceList;
       });

      }




    function getProv(vm,provinceList) {

            console.log("get Province");
         provinceList.getPovinceList().then(function(response){
             vm.provinces = response.data;

         }) ;

      }










});



