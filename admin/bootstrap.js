/**
 * bootstraps angular onto the window.document node
 */
define([
    'require',
    'angular',
    'app',
    'routes',
    'jquery'
], function (require, ng,app, routes,$) {
    'use strict';

    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['myApp']);
    });
});