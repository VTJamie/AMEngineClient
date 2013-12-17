/*global $, define, require, debug*/
/*jslint nomen: true */
require.config({
    //urlArgs: "bust=" + (new Date ()).getTime(),
    paths: {

        // Common JS Libs
        'jquery': '../libs/jquery/jquery-1.10.2',
        'jquery-ui': '../libs/jquery/jquery-ui-1.10.3.custom.min',
        'angular': '../libs/angular/angular.min',
        'angular-route': '../libs/angular/angular-route.min',

        'bootstrap-collapse': '../libs/bootstrap/collapse',
        'bootstrap-transition': '../libs/bootstrap/transition',
        'bootstrap-dropdown': '../libs/bootstrap/dropdown',
        'bootstrap-affix': '../libs/bootstrap/affix',

        'snap': '../libs/snap/snap.min',
        'logging': '../libs/logging/ba-debug',
        'modernizr': '../libs/modernizr/modernizr'
    },
    shim: {
        'jquery-ui': {
            deps: ['jquery']
        },
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'app': {
            deps: ['jquery', 'angular', 'angular-route', 'bootstrap-collapse', 'bootstrap-dropdown', 'bootstrap-affix', 'snap']
        },
        'bootstrap-collapse': {
            deps: ['jquery', 'bootstrap-transition']
        },
        'bootstrap-dropdown': {
            deps: ['jquery']
        },
        'bootstrap-affix': {
            deps: ['jquery']
        }

    },
    map: {
        '*': {
        }
    }
});

//router and routecontroller must be specified in a sub config file
require(['jquery', 'jquery-ui', 'modernizr', 'logging', 'angular', 'app'],
    function ($, jQueryUI, Modernizr, logging, angular, app) {
        "use strict";
        angular.injector(['testApp']).get("testService").request(function (data) {
            angular.bootstrap(document, ['testApp']);
        });

    });
