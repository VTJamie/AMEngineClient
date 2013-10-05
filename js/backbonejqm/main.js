/*global $, require, debug */
require.config({
    //urlArgs: "bust=" + (new Date()).getTime(),
    paths: {

        // Common JS Libs
        'jquery': '../libs/jquery/jquery.1.9.1',
        'jquerymobile': '../libs/jquery/jquery.mobile-1.3.1',
        'jquerymobile-alphascroll': '../customizedlibs/jquery/jquery.mobile.alphascroll',
        'jquerymobile-config': '../customizedlibs/jquery/jqm-config',
        'underscore': '../libs/backbone/underscore-min',
        'backbone': '../libs/backbone/backbone-min',
        'backbone-localstorage': '../libs/backbone/backbone.localStorage',
        'backbone-jquerymobileview': '../customizedlibs/backbone/jqmView',
        'backbone-jquerymobilepage': '../customizedlibs/backbone/jqmPage',
        'backbone-jquerymobileheader': '../customizedlibs/backbone/jqmHeader',
        'backbone-jquerymobilefooter': '../customizedlibs/backbone/jqmFooter',
        'marionette': '../libs/backbone/backbone.marionette.min',
        'Handlebars': '../libs/hbs/Handlebars',
        'handlebars-config': '../customizedlibs/hbs/handlebars-config',
        'hbs': '../libs/require/hbs',
        'text': '../libs/require/text',
        'css': '../libs/require/css',
        'normalize': '../libs/require/normalize',
        'i18nprecompile': '../libs/hbs/i18nprecompile',
        'json2': '../libs/hbs/json2',
        'logging': '../libs/logging/ba-debug',
        'app': 'app',
        'modernizr': '../libs/modernizr/modernizr',



        //CSS
        'jquery-mobile-css': '../../css/jquery.mobile-1.3.1',

        // Local Resources
        'router_home': 'pages/home/router_home',
        'routecontroller_home': 'pages/home/controller_home',

        // Common Components
        'header': 'pages/common/header/component_header',
        'panelcomponent': 'pages/common/header/panel/component_panel',
        'footer': 'pages/common/footer/component_footer',
        'pagecontainer': 'pages/common/pagecontainer/component_pagecontainer',

        // Models
        'headermodel': 'pages/common/header/model_header',
        'footermodel': 'pages/common/footer/model_footer'

        // Collections


    },
    shim: {
        'underscore': {
            'exports': '_'
        },
        'backbone': {
            'deps': ['jquery', 'underscore'],
            'exports': 'Backbone'
        },
        'jquerymobile': {
            'deps': ['jquery', 'jquerymobile-config']
        },
        'jquerymobile-alphascroll': {
            deps: ['jquerymobile', 'modernizr']
        },
        'marionette': {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'app': {
            deps: ['logging', 'jquery', 'underscore', 'backbone', 'marionette']
        },
        'css': {
            deps: ['normalize']
        },
        'phonegap-print': {
            deps: ['phonegap-cordova']
        }
    },
    map: {
        '*': {
            'jqm': 'jquerymobile',
            'hbs/underscore': 'underscore',
            'hbs/i18nprecompile': 'i18nprecompile',
            'hbs/json2': 'json2'
        }
    }
});
//CSS Require
require([
    'css!jquery-mobile-css'
]);


// router and routecontroller must be specified in a sub config file
require(['jquery', 'jquerymobile-config', 'jquerymobile', 'backbone', 'app', 'router_home', 'routecontroller_home', 'Handlebars', 'handlebars-config', 'pagecontainer'], function ($, jqConfig, jqM, Backbone, App, HomeRouter, HomeController, Handlebars, handlebarsconfig, PageContainer) {
    "use strict";
    debug.group("Bootstrap");

    debug.log('Initializing routers');
    var homerouter = new HomeRouter({
        controller: new HomeController()
    });


    App.start();
    debug.groupEnd("Bootstrap");
    return homerouter;
});
