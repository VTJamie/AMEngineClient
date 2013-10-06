/*global $, define, require*/

require.config({
	//urlArgs: "bust=" + (new Date ()).getTime(),
	paths: {

		// Common JS Libs
        'jquery': '../libs/jquery/jquery-1.10.2',
        'jquerymobile': '../libs/jquery/jquery.mobile-1.3.2',
        'jquerymobile-alphascroll': '../customizedlibs/jquery/jquery.mobile.alphascroll',
        'jquerymobile-config': '../customizedlibs/jquery/jqm-config',
        'underscore': '../libs/backbone/underscore-min',
        'backbone': '../libs/backbone/backbone-min',
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
        'normalize': '../libs/require/normalize',
        'i18nprecompile': '../libs/hbs/i18nprecompile',
        'json2': '../libs/hbs/json2',
        'logging': '../libs/logging/ba-debug',
        'app': 'app',
        'modernizr': '../libs/modernizr/modernizr',

		//CSS
		'jquerymobile-css': '../../css/themes/default/jquery.mobile-1.3.1',
		'jquerymobile-theme-default-css': '../../css/themes/default/default',
		'jquerymobile-fluid960-css': '../../css/jquery-mobile-fluid960',
		'amengine-css': '../../css/amengine',

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

		//Utilities
		'factory': './utilities/controlorgroup_factory',
		'urlutility': './utilities/url_utility',
		'generalutility': './utilities/general_utility',
		'Handlebar-helper': './libconfig/handlebar-helper',

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
		'submitrequestmodel': './requests/submit_request_model',
		'basefieldrequestmodel': './requests/basefield_request_model',
		'logoutrequestmodel': './requests/logout_request_model',

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

		'filecontrolview': './controls/filecontrol/filecontrol_view',
		'filecontroltemplate': './controls/filecontrol/filecontrol_template',
		'filecontrolmodel': './controls/filecontrol/filecontrol_model',

		'dateview': './controls/date/date_view',
		'datetemplate': './controls/date/date_template',
		'datemodel': './controls/date/date_model',

		'complexitemlistview': './controls/complexitemlist/complexitemlist_view',
		'complexitemlisttemplate': './controls/complexitemlist/complexitemlist_template',
		'complexitemlistmodel': './controls/complexitemlist/complexitemlist_model',

		'gridview': './controls/grid/grid_view',
		'gridtemplate': './controls/grid/grid_template',
		'gridmodel': './controls/grid/grid_model',
		'griddetailsmodel': './controls/grid/grid_details_model',
		'griddatalaunchmodel': './controls/grid/grid_datalaunch_model',
		'gridcolumnitemcollection': './controls/grid/grid_columnitem_collection',
		'gridcolumnitemmodel': './controls/grid/grid_columnitem_model',
		'gridgriddatacollection': './controls/grid/grid_griddata_collection',
		'gridgriddatamodel': './controls/grid/grid_griddata_model',

		'layouteditorview': './controls/layouteditor/layouteditor_view',
		'layouteditortemplate': './controls/layouteditor/layouteditor_template',
		'layouteditormodel': './controls/layouteditor/layouteditor_model',

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
		'marionette': {
			deps: ['jquery', 'underscore', 'backbone'],
			exports: 'Marionette'
		},
		'Handlebars': {
			exports: 'Handlebars'
		},
		'hbs': {
			deps: ['Handlebar-helper']
		},
		'app': {
			deps: ['jquery', 'jquerymobile', 'logging', 'underscore', 'backbone', 'marionette']
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

require(['css!jquerymobile-css', 'css!amengine-css']);

//require(['css!jquerymobile-css', 'css!jquerymobile-fluid960-css', 'css!amengine-css']);

//router and routecontroller must be specified in a sub config file
require(['jquery', 'jquerymobile-config', 'jquerymobile', 'backbone', 'app', 'constantsrequestmodel'], function ($, jqConfig, jqM, Backbone, App, ConstantsRequestModel) {
	"use strict";
	ConstantsRequestModel.request(function () {
		require(['router', 'routecontroller'], function (Router, Controller) {
			debug.log("Creating Router");
			new Router({
				controller: new Controller()
			});

			App.start();
		});
	});
});
