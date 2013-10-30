/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'basecontrolview', 'hbs!gridtemplate'], function (
    $, jqM, Backbone, BaseControlView, Template) {
    "use strict";
    var C = {
        LABEL: "LABEL",
        firstloaddataobj: "firstload",
        ID: "ID",

        GRID_VIEW_COLUMN_LIST: "GRID_VIEW_COLUMN_LIST",
        GRID_VIEW_COLUMN_NAME: "GRID_VIEW_COLUMN_NAME",
        GRID_VIEW_COLUMN_IS_VISIBLE: "GRID_VIEW_COLUMN_IS_VISIBLE",
        GRID_VIEW_COLUMN_TYPE: "GRID_VIEW_COLUMN_TYPE",
        GRID_VIEW_ROW_CELL_DATA_ARRAY: "GRID_VIEW_ROW_CELL_DATA_ARRAY",
        GRID_VIEW_DATA_OBJECT_LAUNCH: "GRID_VIEW_DATA_OBJECT_LAUNCH",
        GRID_VIEW_DATA_OBJECT_LAUNCH_OBJECT_NAME: "GRID_VIEW_DATA_OBJECT_LAUNCH_OBJECT_NAME",
        GRID_VIEW_DATA_OBJECT_LAUNCH_TARGET_FIELD: "GRID_VIEW_DATA_OBJECT_LAUNCH_TARGET_FIELD",


        GRID_VIEW_GRID_DETAILS: "GRID_VIEW_GRID_DETAILS",

        GRID_VIEW_RELOAD_REQUEST_PAGE: "GRID_VIEW_RELOAD_REQUEST_PAGE",
        GRID_VIEW_RELOAD_REQUEST_ROWS: "GRID_VIEW_RELOAD_REQUEST_ROWS",
        GRID_VIEW_RELOAD_REQUEST_SORT_NAME: "GRID_VIEW_RELOAD_REQUEST_SORT_NAME",
        GRID_VIEW_RELOAD_REQUEST_SORT_ORDER: "GRID_VIEW_RELOAD_REQUEST_SORT_ORDER",

        RESPONSE_BODY: "RESPONSE_BODY",
        GRID_VIEW_CURRENT_PAGE: "GRID_VIEW_CURRENT_PAGE",
        GRID_VIEW_NUMBER_OF_PAGES: "GRID_VIEW_NUMBER_OF_PAGES",
        GRID_VIEW_TOTAL_NUMBER: "GRID_VIEW_TOTAL_NUMBER"


    },
        GridView = BaseControlView.extend({
            initialize: function (options) {
                BaseControlView.prototype.initialize.apply(this, arguments);
                this.template = Template;                
            },
            attributes: {
                 "class": "ui-corner-all amengine-table"
            },
            getValue : function () {
                return {};
            },
            events: {
                'tap .ui-icon-delete': 'closeButtonPressed'
            },
            closeButtonPressed: function() {

            },
            render: function () {
                BaseControlView.prototype.render.apply(this, arguments);

                return this.el;
            },
            onShow: function() {

            }
        });
    return GridView;
});
