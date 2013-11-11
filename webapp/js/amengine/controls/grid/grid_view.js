/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'basecontrolview', 'griddeleterowrequestmodel', 'refreshrequestmodel', 'hbs!gridtemplate'], function (
    $, jqM, Backbone, BaseControlView, GridDeleteRowRequestModel, RefreshControlsRequestModel, Template) {
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
            },
            template: Template,
            attributes: {
                 "class": "ui-corner-all amengine-table"
            },
            getValue : function () {
                return {};
            },
            events: {
                'tap .grid-delete-button': 'deleteButtonPressed'
            },
            deleteButtonPressed: function(e) {
                var that = this;
                GridDeleteRowRequestModel.request({
                    REQUEST_FIELD_ACTION_PROPERTY_NAME: this.model.get(C.ID),
                    REQUEST_GRID_VIEW_ITEM_ID: $(e.target).closest('a').attr('data-id')
                }, function(model) {
                    RefreshControlsRequestModel.request({}, function (model) {
                      //  debug.log(model);
                    }, {
                        fields: [
                            that.model.get(C.ID)
                        ]
                    });
                });
                e.preventDefault();
                return false;
            },
            render: function () {
                BaseControlView.prototype.render.apply(this, arguments);
              //  debug.log(this.model.toJSON());
                return this.el;
            },
            onShow: function() {

            }
        });
    return GridView;
});
