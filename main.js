require.config({

  // alias libraries paths
    paths: {
        'jquery':'bower_components/jquery/jquery.min',
        'underscore':'bower_components/underscore/underscore-min',
        'angular': 'bower_components/angular/angular.min',
        'uiRouter':'bower_components/angular-ui-router/release/angular-ui-router.min',
        'angular-animate':'bower_components/angular-animate/angular-animate.min',
        'angular-resource':'bower_components/angular-resource/angular-resource.min',
        'moment':'bower_components/moment/min/moment.min',
        'domReady': 'bower_components/requirejs-domready/domReady',
        'ngMessages': 'bower_components/angular-messages/angular-messages.min',
        'ngMaterial': 'bower_components/angular-material/angular-material.min',
        'province':'admin/modules/province/province',
        'datatables':'bower_components/datatables/media/js/jquery.dataTables.min',
        'angular-datatables':'bower_components/angular-datatables/dist/angular-datatables.min',
        'uiMask':'bower_components/angular-ui-mask/dist/mask.min'

    },

    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'angular': {
            exports: 'angular'
        },
        'uiRouter':{
            deps: ['angular']
        },
        'uiMask':{
            deps: ['angular']
        },
        'ngMessages':{
            deps: ['angular']
        },
        'ngMaterial':{
            deps: ['angular']
        },
        'province':{
            deps: ['angular']
        },
        'angular-datatables':{
            deps: ['jquery', 'datatables','angular'],
            exports: 'angular'
        }
    },

    // kick start application
    deps: ['./bootstrap']
});