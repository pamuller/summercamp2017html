define([
    'angular',
    'jquery',
    'uiRouter',
    'modules/church/churchcreate',
    'modules/registerUserView/registerUserView',
    'modules/emailMessages/emailmessage',
    'modules/transport/transportModel.js',
    'modules/tshirt/tshirtModel.js',
    'modules/logon/logon.js',
    'province',
    'ngMessages',
    'angular-datatables',
    'uiMask'


], function (ng,$) {
    'use strict';

    return ng.module('myApp', [
      'ui.router','myApp.churchcreate','myApp.registerUserView','myApp.emailmessageView','myApp.transportcreate','myApp.tshirtcreate','myApp.logonView','myApp.province','ngMessages','datatables','ui.mask'
    ]);
});