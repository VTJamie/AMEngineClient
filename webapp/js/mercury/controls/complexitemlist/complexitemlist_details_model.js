/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basemodel', 'complexitemlistcolumnitemcollection', 'complexitemlistgriddatacollection'], function (Backbone, CM, BaseModel, ComplexItemListColumnListCollection, ComplexItemListGridDataCollection) {
    "use strict";
    var C = {
            GRID_VIEW_CURRENT_PAGE: "GRID_VIEW_CURRENT_PAGE",
            GRID_VIEW_PAGE_SIZE: "GRID_VIEW_PAGE_SIZE",
            GRID_VIEW_TOTAL_NUMBER: "GRID_VIEW_TOTAL_NUMBER",
            GRID_VIEW_NUMBER_OF_PAGES: "GRID_VIEW_NUMBER_OF_PAGES",
            GRID_VIEW_NUMBER_OF_SUPPLIED_RECORDS: "GRID_VIEW_NUMBER_OF_SUPPLIED_RECORDS",
            GRID_VIEW_COLUMN_LIST: ComplexItemListColumnListCollection,

            GRID_VIEW_DATA: ComplexItemListGridDataCollection,

            GRID_VIEW_DELETE_ACTION: "GRID_VIEW_DELETE_ACTION",
            GRID_VIEW_RELOAD_REQUEST_PAGE: "GRID_VIEW_RELOAD_REQUEST_PAGE",
            GRID_VIEW_RELOAD_REQUEST_ROWS: "GRID_VIEW_RELOAD_REQUEST_ROWS",
            GRID_VIEW_RELOAD_REQUEST_SORT_NAME: "GRID_VIEW_RELOAD_REQUEST_SORT_NAME",
            GRID_VIEW_RELOAD_REQUEST_SORT_ORDER: "GRID_VIEW_RELOAD_REQUEST_SORT_ORDER"
        },
        ComplexItemListDetailsModel = BaseModel.extend({
            C: $.extend({}, C, BaseModel.prototype.C)
        });

    return ComplexItemListDetailsModel;
});
