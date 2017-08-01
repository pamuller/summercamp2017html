require.config({

  // alias libraries paths
    paths: {
        'jquery':'bower_components/jquery/jquery',
        'underscore':'bower_components/underscore/underscore',
        'angular': 'bower_components/angular/angular',
        'uiRouter':'bower_components/angular-ui-router/release/angular-ui-router',
        'angular-animate':'bower_components/angular-animate/angular-animate',
        'angular-resource':'bower_components/angular-resource/angular-resource',
        'angular-resource':'bower_components/angular-resource/angular-resource',
        'moment':'bower_components/moment/moment',
        'domReady': 'bower_components/requirejs-domready/domReady',
        'ngMessages': 'bower_components/angular-messages/angular-messages',
        'ngMaterial': 'bower_components/angular-material/angular-material',
        'province':'modules/province/province',
        'datatables':'bower_components/datatables/media/js/jquery.dataTables',
        'angular-datatables':'bower_components/angular-datatables/dist/angular-datatables',
        'uiMask':'bower_components/angular-ui-mask/dist/mask'


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