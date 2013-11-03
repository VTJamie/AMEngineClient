({
    baseUrl: "js",
    optimize: "none",
    paths: {

            // Common JS Libs
            'jquery': 'libs/jquery/jquery-1.10.2',
            'jquery-ui': 'libs/jquery/jquery-ui-1.10.3.custom.min',
            'jquerymobile': 'libs/jquery/jquery.mobile-1.3.2',
            'jquerymobile-alphascroll': 'customizedlibs/jquery/jquery.mobile.alphascroll',
            'jquerymobile-config': 'customizedlibs/jquery/jqm-config',
            'jquery-ui-touch-punch': 'libs/jquery/jquery.ui.touch-punch.min',

            'underscore': 'libs/backbone/underscore-min',
            'backbone': 'libs/backbone/backbone',
            'backbone-localstorage': 'libs/backbone/backbone.localStorage',
            'backbone-jquerymobileview': 'customizedlibs/backbone/jqmView',
            'backbone-jquerymobilepage': 'customizedlibs/backbone/jqmPage',
            'backbone-jquerymobileheader': 'customizedlibs/backbone/jqmHeader',
            'backbone-jquerymobilefooter': 'customizedlibs/backbone/jqmFooter',
            'marionette': 'libs/backbone/backbone.marionette',
            'Handlebars': 'libs/hbs/Handlebars',
            'handlebars-config': 'customizedlibs/hbs/handlebars-config',
            'hbs': 'libs/require/hbs',
            'text': 'libs/require/text',
            'css': 'libs/require/css',
            'css-builder': 'libs/require/css-builder',
            'normalize': 'libs/require/normalize',
            'i18nprecompile': 'libs/hbs/i18nprecompile',
            'json2': 'libs/hbs/json2',
            'logging': 'libs/logging/ba-debug',
            'app': 'amengine/app',
            'modernizr': 'libs/modernizr/modernizr',

            //CSS
            'jquerymobile-css': '../css/themes/default/jquery.mobile-1.3.1',
            'jquerymobile-theme-default-css': '../css/themes/default/default',
            'jquerymobile-fluid960-css': '../css/jquery-mobile-fluid960',
            'amengine-css': '../css/amengine',
            'jqm-iconpack-css': '../css/jqm-icon-pack-2.0-original',
            'jquerymobiletable-css': '../css/jquery.mobile.table',

            'slickgrid-grid-css': '../css/slickgrid/slick.grid',
            'slickgrid-grid-theme-css': '../css/slickgrid/slick-default-theme',

            //General Resources
            'router': 'amengine/router',
            'routecontroller': 'amengine/controller',
            'constants': 'amengine/constants',
            'header': 'common/header/component_header',
            'panelcomponent': 'common/header/panel/component_panel',
            'footer': 'common/footer/component_footer',
            'pagecontainer': 'common/pagecontainer/component_pagecontainer',

            //Page
            'pageview': 'amengine/page/page_view',
            'pagetemplate': 'amengine/page/page_template',
            'pageresponsebodymodel': 'amengine/page/pageresponsebody_model',
            'pagemenuitemcollection': 'amengine/page/pagemenu/pagemenuitem_collection',
            'pagemenuitemmodel': 'amengine/page/pagemenu/pagemenuitem_model',
            'pagemenuitemview': 'amengine/page/pagemenu/pagemenuitem_view',
            'pagemenuitemtemplate': 'amengine/page/pagemenu/pagemenuitem_template',
            'pagemenuview': 'amengine/page/pagemenu/pagemenu_view',
            'pagemenutemplate': 'amengine/page/pagemenu/pagemenu_template',
            'pagemenufielddatacouplingcollection': 'amengine/page/pagemenu/pagemenufielddatacoupling_collection',
            'pagemenufieldstaticcouplingcollection': 'amengine/page/pagemenu/pagemenufieldstaticcoupling_collection',
            'pagemenufielddatacouplingmodel': 'amengine/page/pagemenu/pagemenufielddatacoupling_model',
            'pagemenufieldstaticcouplingmodel': 'amengine/page/pagemenu/pagemenufieldstaticcoupling_model',
            'errormodel': 'amengine/page/error_model',
            'errorcollection': 'amengine/page/error_collection',
            'pagecollection': 'amengine/page/page_collection',

            //Dialog
            'dialogview': 'amengine/controls/complexitemlist/dialog/dialog_view',
            'dialogtemplate': 'amengine/controls/complexitemlist/dialog/dialog_template',
            'dialogresponsebodymodel': 'amengine/controls/complexitemlist/dialog/dialogresponsebody_model',

            //Utilities
            'factory': 'amengine/utilities/controlorgroup_factory',
            'urlutility': 'amengine/utilities/url_utility',
            'generalutility': 'amengine/utilities/general_utility',

            //General Models
            'basemodel': 'amengine/models/base_model',
            'persistmodel': 'amengine/models/persist_model',


            //Menu
            'menuview': 'amengine/menu/menu_view',
            'menumodel': 'amengine/menu/menu_model',
            'menutemplate': 'amengine/menu/menu_template',
            'menutransfervaluemodel': 'amengine/menu/menutransfervalue_model',
            'menuitemcollection': 'amengine/menu/menuitem_collection',
            'menutransfervaluecollection': 'amengine/menu/menutransfervalue_collection',

            'menuitemview': 'amengine/menu/menuitem_view',
            'menuitemmodel': 'amengine/menu/menuitem_model',
            'menuitemtemplate': 'amengine/menu/menuitem_template',

            'submenuview': 'amengine/menu/submenu_view',
            'submenutemplate': 'amengine/menu/submenu_template',

            //Request Models
            'baserequestmodel': 'amengine/requests/base_request_model',
            'baseobjectrequestmodel': 'amengine/requests/baseobject_request_model',
            'constantsrequestmodel': 'amengine/requests/constants_request_model',
            'landingpagerequestmodel': 'amengine/requests/landingpage_request_model',
            'menurequestmodel': 'amengine/requests/menu_request_model',
            'initialpagerequestmodel': 'amengine/requests/initialpage_request_model',
            'submitrequestmodel': 'amengine/controls/button/submit_request_model',
            'basefieldrequestmodel': 'amengine/requests/basefield_request_model',
            'logoutrequestmodel': 'amengine/requests/logout_request_model',
            'complexitemlisteditrequestmodel': 'amengine/controls/complexitemlist/complexitemlistedit_request_model',
            'complexitemlistnewrequestmodel': 'amengine/controls/complexitemlist/complexitemlistnew_request_model',
            'complexitemlistsubmitrequestmodel': 'amengine/controls/complexitemlist/complexitemlistsubmit_request_model',
            'refreshrequestmodel': 'amengine/requests/refresh_request_model',
            'refreshresponsebodymodel': 'amengine/requests/refresh_responsebody_model',

            //Controls
            'basecontrolview': 'amengine/controls/basecontrol_view',
            'basecontrolmodel': 'amengine/controls/basecontrol_model',
            'controlviewmodel': 'amengine/controls/control_view_model',
            'controlviewcollection': 'amengine/controls/control_view_collection',
            'controlcollection': 'amengine/controls/control_collection',
            'controlfactory': 'amengine/controls/control_factory',

            'textview': 'amengine/controls/text/text_view',
            'texttemplate': 'amengine/controls/text/text_template',
            'textmodel': 'amengine/controls/text/text_model',

            'selectview': 'amengine/controls/select/select_view',
            'selecttemplate': 'amengine/controls/select/select_template',
            'selectmodel': 'amengine/controls/select/select_model',
            'selectitemcollection': 'amengine/controls/select/selectitem_collection',
            'selectitemmodel': 'amengine/controls/select/selectitem_model',

            'buttonview': 'amengine/controls/button/button_view',
            'buttontemplate': 'amengine/controls/button/button_template',
            'buttonmodel': 'amengine/controls/button/button_model',
            'submitresponsebodymodel': 'amengine/controls/button/submitresponsebody_model',
            'submitactioncollection': 'amengine/controls/button/submitaction_collection',
            'submitactionmodel': 'amengine/controls/button/submitaction_model',

            'filecontrolview': 'amengine/controls/filecontrol/filecontrol_view',
            'filecontroltemplate': 'amengine/controls/filecontrol/filecontrol_template',
            'filecontrolmodel': 'amengine/controls/filecontrol/filecontrol_model',

            'dateview': 'amengine/controls/date/date_view',
            'datetemplate': 'amengine/controls/date/date_template',
            'datemodel': 'amengine/controls/date/date_model',

            'complexitemlistview': 'amengine/controls/complexitemlist/complexitemlist_view',
            'complexitemlisttemplate': 'amengine/controls/complexitemlist/complexitemlist_template',
            'complexitemlistmodel': 'amengine/controls/complexitemlist/complexitemlist_model',
            'complexitemlistdetailsmodel': 'amengine/controls/complexitemlist/complexitemlist_details_model',
            'complexitemlistcolumnitemcollection': 'amengine/controls/complexitemlist/complexitemlist_columnitem_collection',
            'complexitemlistcolumnitemmodel': 'amengine/controls/complexitemlist/complexitemlist_columnitem_model',
            'complexitemlistgriddatacollection': 'amengine/controls/complexitemlist/complexitemlist_griddata_collection',
            'complexitemlistgriddatamodel': 'amengine/controls/complexitemlist/complexitemlist_griddata_model',
            'complexitemlistsubmitresponsebodymodel': 'amengine/controls/complexitemlist/complexitemlistsubmitresponsebody_model',

            'gridview': 'amengine/controls/grid/grid_view',
            'gridtemplate': 'amengine/controls/grid/grid_template',
            'gridmodel': 'amengine/controls/grid/grid_model',
            'griddetailsmodel': 'amengine/controls/grid/grid_details_model',
            'griddatalaunchmodel': 'amengine/controls/grid/grid_datalaunch_model',
            'gridcolumnitemcollection': 'amengine/controls/grid/grid_columnitem_collection',
            'gridcolumnitemmodel': 'amengine/controls/grid/grid_columnitem_model',
            'gridgriddatacollection': 'amengine/controls/grid/grid_griddata_collection',
            'gridgriddatamodel': 'amengine/controls/grid/grid_griddata_model',

            'layouteditorview': 'amengine/controls/layouteditor/layouteditor_view',
            'layouteditortemplate': 'amengine/controls/layouteditor/layouteditor_template',
            'layouteditoravailablepartialtemplate': 'amengine/controls/layouteditor/layouteditorpartialavailabletemplate',
            'layouteditordroppartialtemplate': 'amengine/controls/layouteditor/layouteditorpartialdroptemplate',
            'layouteditormodel': 'amengine/controls/layouteditor/layouteditor_model',
            'layouteditoritemmodel': 'amengine/controls/layouteditor/layouteditor_item_model',
            'layouteditoritemcollection': 'amengine/controls/layouteditor/layouteditor_item_collection',

            'workflowindicatorview': 'amengine/controls/workflowindicator/workflowindicator_view',
            'workflowindicatortemplate': 'amengine/controls/workflowindicator/workflowindicator_template',
            'workflowindicatormodel': 'amengine/controls/workflowindicator/workflowindicator_model',

            //Groups
            'basegroupmodel': 'amengine/groups/basegroup_model',
            'groupfactory': 'amengine/groups/group_factory',

            'tablegroupview': 'amengine/groups/table/tablegroup_view',
            'tablegroupmodel': 'amengine/groups/table/tablegroup_model',
            'tablegrouptemplate': 'amengine/groups/table/tablegroup_template',

            'collapsiblegroupview': 'amengine/groups/collapsible/collapsiblegroup_view',
            'collapsiblegroupmodel': 'amengine/groups/collapsible/collapsiblegroup_model',
            'collapsiblegrouptemplate': 'amengine/groups/collapsible/collapsiblegroup_template',

            'buttongroupview': 'amengine/groups/button/buttongroup_view',
            'buttongroupmodel': 'amengine/groups/button/buttongroup_model',
            'buttongrouptemplate': 'amengine/groups/button/buttongroup_template'
        },
    name: "amengine/main",
    out: "main-built.js"
})