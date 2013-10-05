/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basemodel'], function (Backbone, CM, BaseModel) {
    "use strict";
    var constants = {

    }, C = {
            ID: "ID",
            GRID_VIEW_ROW_CELL_DATA_ARRAY: "GRID_VIEW_ROW_CELL_DATA_ARRAY",
        }, GridGridDataModel = BaseModel.extend({
            C: $.extend(C, BaseModel.prototype.C)
        });

    return GridGridDataModel;
});
