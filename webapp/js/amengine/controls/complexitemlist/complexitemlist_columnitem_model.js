/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basemodel'], function (Backbone, CM, BaseModel) {
    "use strict";
    var constants = {
            GRID_VIEW_COLUMN_TYPE_DISPLAY: "GRID_VIEW_COLUMN_TYPE_DISPLAY"
        },
        C = {
            GRID_VIEW_COLUMN_NAME: "GRID_VIEW_COLUMN_NAME",
            GRID_VIEW_COLUMN_IS_VISIBLE: "GRID_VIEW_COLUMN_IS_VISIBLE",
            GRID_VIEW_COLUMN_TYPE: function (value) {
                if (value === CM.get(constants.GRID_VIEW_COLUMN_TYPE_DISPLAY)) {
                    return constants.GRID_VIEW_COLUMN_TYPE_DISPLAY;
                }
            }
        },
        ComplexItemListColumnItemModel = BaseModel.extend({
            C: $.extend({}, C, BaseModel.prototype.C)
        });

    return ComplexItemListColumnItemModel;
});
