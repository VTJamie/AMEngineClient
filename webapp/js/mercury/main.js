/*global $, define, require, debug*/
/*jslint nomen: true */
require.config({
    //urlArgs: "bust=" + (new Date ()).getTime(),
    paths: {

        // Common JS Libs
        'jquery': '../libs/jquery/jquery-1.10.2',
        'jquery-ui': '../libs/jquery/jquery-ui-1.10.3.custom.min',
        'jquerymobile': '../libs/jquery/jquery.mobile-1.3.2',
        'jquerymobile-alphascroll': '../customizedlibs/jquery/jquery.mobile.alphascroll',
        'jquerymobile-config': '../customizedlibs/jquery/jqm-config',
        'jquery-ui-touch-punch': '../libs/jquery/jquery.ui.touch-punch.min',

        //File Upload
        'jquery-fileupload-iframe': '../libs/jquery/jquery.iframe-transport',
        'jquery-fileupload': '../libs/jquery/jquery.fileupload',
        'jquery-fileupload-process': '../libs/jquery/jquery.fileupload-process',
        'jquery-fileupload-image': '../libs/jquery/jquery.fileupload-image',
        'jquery-fileupload-audio': '../libs/jquery/jquery.fileupload-audio',
        'jquery-fileupload-video': '../libs/jquery/jquery.fileupload-video',
        'jquery-fileupload-validate': '../libs/jquery/jquery.fileupload-validate',
        'jquery-fileupload-ui': '../libs/jquery/jquery.fileupload-ui',
        'jquery-fileupload-jquery-ui': '../libs/jquery/jquery.fileupload-jquery-ui',
        'angular': '../libs/angular/angular.min',
        'underscore': '../libs/backbone/underscore',
        'backbone': '../libs/backbone/backbone',
        'backbone-localstorage': '../libs/backbone/backbone.localStorage',
        'backbone-jquerymobileview': '../customizedlibs/backbone/jqmView',
        'backbone-jquerymobilepage': '../customizedlibs/backbone/jqmPage',
        'backbone-jquerymobileheader': '../customizedlibs/backbone/jqmHeader',
        'backbone-jquerymobilefooter': '../customizedlibs/backbone/jqmFooter',
        'marionette': '../libs/backbone/backbone.marionette',
        'Handlebars': '../libs/hbs/Handlebars',
        'handlebars-config': '../customizedlibs/hbs/handlebars-config',
        'hbs': '../libs/require/hbs',
        'text': '../libs/require/text',
        'css': '../libs/require/css',
        'css-builder': '../libs/require/css-builder',
        'normalize': '../libs/require/normalize',
        'i18nprecompile': '../libs/hbs/i18nprecompile',
        'json2': '../libs/hbs/json2',
        'logging': '../libs/logging/ba-debug',
        'app': './app',
        'modernizr': '../libs/modernizr/modernizr',

        //CSS
        'jquerymobile-css': '../../css/themes/default/jquery.mobile-1.3.1',
        'mercury-css': '../../css/mercury',
        'jqm-iconpack-css': '../../css/jqm-icon-pack-2.0-original',


        //General Resources
        'router': './router',
        'routecontroller': './controller',
        'constants': './constants',
        'header': 'common/header/component_header',
        'panelcomponent': 'common/header/panel/component_panel',
        'footer': 'common/footer/component_footer',
        'pagecontainer': 'common/pagecontainer/component_pagecontainer',

        //Page
        'pageview': './page/page_view',
        'pagetemplate': './page/page_template',
        'pageresponsebodymodel': './page/pageresponsebody_model',
        'pagemenuitemcollection': './page/pagemenu/pagemenuitem_collection',
        'pagemenuitemmodel': './page/pagemenu/pagemenuitem_model',
        'pagemenuitemview': './page/pagemenu/pagemenuitem_view',
        'pagemenuitemtemplate': './page/pagemenu/pagemenuitem_template',
        'pagemenuview': './page/pagemenu/pagemenu_view',
        'pagemenutemplate': './page/pagemenu/pagemenu_template',
        'pagemenufielddatacouplingcollection': './page/pagemenu/pagemenufielddatacoupling_collection',
        'pagemenufieldstaticcouplingcollection': './page/pagemenu/pagemenufieldstaticcoupling_collection',
        'pagemenufielddatacouplingmodel': './page/pagemenu/pagemenufielddatacoupling_model',
        'pagemenufieldstaticcouplingmodel': './page/pagemenu/pagemenufieldstaticcoupling_model',
        'errormodel': './page/error_model',
        'errorcollection': './page/error_collection',
        'pagecollection': './page/page_collection',

        //Dialog
        'dialogview': './controls/complexitemlist/dialog/dialog_view',
        'dialogtemplate': './controls/complexitemlist/dialog/dialog_template',
        'dialogresponsebodymodel': './controls/complexitemlist/dialog/dialogresponsebody_model',

        //Utilities
        'factory': './utilities/controlorgroup_factory',
        'urlutility': './utilities/url_utility',
        'generalutility': './utilities/general_utility',

        //General Models
        'basemodel': './models/base_model',
        'persistmodel': './models/persist_model',


        //Menu
        'menuview': './menu/menu_view',
        'menumodel': './menu/menu_model',
        'menutemplate': './menu/menu_template',
        'menutransfervaluemodel': './menu/menutransfervalue_model',
        'menuitemcollection': './menu/menuitem_collection',
        'menutransfervaluecollection': './menu/menutransfervalue_collection',

        'menuitemview': './menu/menuitem_view',
        'menuitemmodel': './menu/menuitem_model',
        'menuitemtemplate': './menu/menuitem_template',

        'submenuview': './menu/submenu_view',
        'submenutemplate': './menu/submenu_template',

        //Request Models
        'baserequestmodel': './requests/base_request_model',
        'baseobjectrequestmodel': './requests/baseobject_request_model',
        'constantsrequestmodel': './requests/constants_request_model',
        'landingpagerequestmodel': './requests/landingpage_request_model',
        'menurequestmodel': './requests/menu_request_model',
        'initialpagerequestmodel': './requests/initialpage_request_model',
        'submitrequestmodel': './controls/button/submit_request_model',
        'basefieldrequestmodel': './requests/basefield_request_model',
        'logoutrequestmodel': './requests/logout_request_model',
        'refreshrequestmodel': './requests/refresh_request_model',
        'refreshresponsebodymodel': './requests/refresh_responsebody_model',
        'reloadgridrequestmodel': './requests/reloadgrid_request_model',

        //Controls
        'basecontrolview': './controls/basecontrol_view',
        'basecontrolmodel': './controls/basecontrol_model',
        'controlviewmodel': './controls/control_view_model',
        'controlviewcollection': './controls/control_view_collection',
        'controlcollection': './controls/control_collection',
        'controlfactory': './controls/control_factory',

        'textview': './controls/text/text_view',
        'texttemplate': './controls/text/text_template',
        'textmodel': './controls/text/text_model',

        'selectview': './controls/select/select_view',
        'selecttemplate': './controls/select/select_template',
        'selectmodel': './controls/select/select_model',
        'selectitemcollection': './controls/select/selectitem_collection',
        'selectitemmodel': './controls/select/selectitem_model',

        'buttonview': './controls/button/button_view',
        'buttontemplate': './controls/button/button_template',
        'buttonmodel': './controls/button/button_model',
        'submitresponsebodymodel': './controls/button/submitresponsebody_model',
        'submitactioncollection': './controls/button/submitaction_collection',
        'submitactionmodel': './controls/button/submitaction_model',
        'postvaluecollection': './controls/button/postvalue_collection',
        'postvaluemodel': './controls/button/postvalue_model',

        'filecontrolview': './controls/filecontrol/filecontrol_view',
        'filecontroltemplate': './controls/filecontrol/filecontrol_template',
        'filecontrolmodel': './controls/filecontrol/filecontrol_model',

        'dateview': './controls/date/date_view',
        'datetemplate': './controls/date/date_template',
        'datemodel': './controls/date/date_model',

        'complexitemlistview': './controls/complexitemlist/complexitemlist_view',
        'complexitemlisttemplate': './controls/complexitemlist/complexitemlist_template',
        'complexitemlistmodel': './controls/complexitemlist/complexitemlist_model',
        'complexitemlistdetailsmodel': './controls/complexitemlist/complexitemlist_details_model',
        'complexitemlistcolumnitemcollection': './controls/complexitemlist/complexitemlist_columnitem_collection',
        'complexitemlistcolumnitemmodel': './controls/complexitemlist/complexitemlist_columnitem_model',
        'complexitemlistgriddatacollection': './controls/complexitemlist/complexitemlist_griddata_collection',
        'complexitemlistgriddatamodel': './controls/complexitemlist/complexitemlist_griddata_model',
        'complexitemlistsubmitresponsebodymodel': './controls/complexitemlist/complexitemlistsubmitresponsebody_model',
        'complexitemlisteditrequestmodel': './controls/complexitemlist/complexitemlistedit_request_model',
        'complexitemlistdeleterequestmodel': './controls/complexitemlist/complexitemlistdelete_request_model',
        'complexitemlistnewrequestmodel': './controls/complexitemlist/complexitemlistnew_request_model',
        'complexitemlistsubmitrequestmodel': './controls/complexitemlist/complexitemlistsubmit_request_model',

        'gridview': './controls/grid/grid_view',
        'gridtemplate': './controls/grid/grid_template',
        'gridmodel': './controls/grid/grid_model',
        'griddetailsmodel': './controls/grid/grid_details_model',
        'griddatalaunchmodel': './controls/grid/grid_datalaunch_model',
        'gridcolumnitemcollection': './controls/grid/grid_columnitem_collection',
        'gridcolumnitemmodel': './controls/grid/grid_columnitem_model',
        'gridgriddatacollection': './controls/grid/grid_griddata_collection',
        'gridgriddatamodel': './controls/grid/grid_griddata_model',
        'griddeleterowrequestmodel': './controls/grid/grid_delete_row_request_model',


        'layouteditorview': './controls/layouteditor/layouteditor_view',
        'layouteditortemplate': './controls/layouteditor/layouteditor_template',
        'layouteditoravailablepartialtemplate': './controls/layouteditor/layouteditorpartialavailabletemplate',
        'layouteditordroppartialtemplate': './controls/layouteditor/layouteditorpartialdroptemplate',
        'layouteditormodel': './controls/layouteditor/layouteditor_model',
        'layouteditoritemmodel': './controls/layouteditor/layouteditor_item_model',
        'layouteditoritemcollection': './controls/layouteditor/layouteditor_item_collection',

        'workflowindicatorview': './controls/workflowindicator/workflowindicator_view',
        'workflowindicatortemplate': './controls/workflowindicator/workflowindicator_template',
        'workflowindicatormodel': './controls/workflowindicator/workflowindicator_model',

        //Groups
        'basegroupmodel': './groups/basegroup_model',
        'groupfactory': './groups/group_factory',

        'tablegroupview': './groups/table/tablegroup_view',
        'tablegroupmodel': './groups/table/tablegroup_model',
        'tablegrouptemplate': './groups/table/tablegroup_template',

        'collapsiblegroupview': './groups/collapsible/collapsiblegroup_view',
        'collapsiblegroupmodel': './groups/collapsible/collapsiblegroup_model',
        'collapsiblegrouptemplate': './groups/collapsible/collapsiblegroup_template',

        'buttongroupview': './groups/button/buttongroup_view',
        'buttongroupmodel': './groups/button/buttongroup_model',
        'buttongrouptemplate': './groups/button/buttongroup_template'
    },
    shim: {
        'backbone': {
            'deps': ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'jquerymobile': {
            'deps': ['jquery', 'jquerymobile-config']
        },
        'marionette': {
            deps: ['jquery', 'underscore', 'backbone']
        },
        'hbs': {
            deps: ['Handlebars', 'underscore', 'handlebars-config']
        },
        'handlebars-config': {
            deps: ['Handlebars', 'underscore']
        },
        'app': {
            deps: ['jquery', 'jquerymobile', 'logging', 'underscore', 'backbone', 'marionette']
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        'mercury-css': {
            deps: ['jquerymobile-css']
        },
        'jqm-iconpack-css': {
            deps: ['jquerymobile-css']
        },
        'jquery-ui-touch-punch': {
            deps: ['jquery-ui']
        },
        'router': {
            deps: ['app']
        },
        'routecontroller': {
            deps: ['app']
        },
        'jquery-fileupload': {
            deps: ['jquery-fileupload-iframe']
        },
        'jquery-fileupload-process': {
            deps: ['jquery-fileupload']
        },
        'jquery-fileupload-image': {
            deps: ['jquery-fileupload']
        },
        'jquery-fileupload-audio': {
            deps: ['jquery-fileupload']
        },
        'jquery-fileupload-video': {
            deps: ['jquery-fileupload']
        },
        'jquery-fileupload-validate': {
            deps: ['jquery-fileupload']
        },
        'jquery-fileupload-ui': {
            deps: ['jquery-fileupload']
        },
        'jquery-fileupload-jquery-ui': {
            deps: ['jquery-fileupload']
        }
    },
    map: {
        '*': {
            'jqm': 'jquerymobile',
            'hbs/underscore': 'underscore',
            'hbs/i18nprecompile': 'i18nprecompile',
            'hbs/json2': 'json2',
            'jquery.ui.widget': 'jquery-ui',
            'jquery.fileupload': 'jquery-fileupload',
            'jquery.fileupload-process': 'jquery-fileupload-process'
        }
    },
    hbs: {
        disableI18n: true
    }
});

//router and routecontroller must be specified in a sub config file
require(['jquery', 'jquery-ui', 'jquery-ui-touch-punch', 'modernizr', 'jquerymobile-config', 'jquerymobile', 'logging', 'underscore', 'backbone', 'marionette', 'Handlebars', 'handlebars-config', 'hbs', 'app', 'constantsrequestmodel', 'router', 'routecontroller'],
    function ($, jQueryUI, jqUIpunch, Modernizr, jqConfig, jqM, logging, _, Backbone, Marionette, handlebars, hbsconfig, hbs, App, ConstantsRequestModel, Router, Controller) {
        "use strict";
        ConstantsRequestModel.request(function () {

            debug.log("Creating Router");
            (function () { return new Router({
                controller: new Controller()
            }); }());

            App.start();

        });
    });
