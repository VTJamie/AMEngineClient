/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basemodel'], function (Backbone, CM, BaseModel) {
    "use strict";
    var C = {
            "GRID_VIEW_DATA_OBJECT_LAUNCH_OBJECT_NAME": "GRID_VIEW_DATA_OBJECT_LAUNCH_OBJECT_NAME",
            "GRID_VIEW_DATA_OBJECT_LAUNCH_TARGET_FIELD": "GRID_VIEW_DATA_OBJECT_LAUNCH_TARGET_FIELD"
        },
        GridDataObjectLaunchModel = BaseModel.extend({
            C: $.extend({}, C, BaseModel.prototype.C)
        });

    return GridDataObjectLaunchModel;
});
