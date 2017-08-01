define([
    'angular',
    'jquery',
    'uiRouter',
    'admin/modules/church/churchcreate',
    'modules/registerUser/registerUser',
    'province',
    'ngMessages',
    'angular-datatables',
    'uiMask'


], function (ng,$) {
    'use strict';

    return ng.module('myApp', [
      'ui.router','myApp.churchcreate','myApp.registerUser','myApp.province','ngMessages','datatables','ui.mask'
    ]);
});