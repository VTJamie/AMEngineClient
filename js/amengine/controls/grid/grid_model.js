/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basecontrolmodel', 'griddetailsmodel', 'griddatalaunchmodel'], function (Backbone, CM, BaseControlModel, GridDetailsModel, GridDataLaunchModel) {
    "use strict";
    var constants = {
        CONTROL_TYPE_GRID: "CONTROL_TYPE_GRID",

    }, C = {
            GRID_VIEW_DATA_OBJECT_LAUNCH: GridDataLaunchModel,
            GRID_VIEW_GRID_DETAILS: GridDetailsModel,
            CONTROL_TYPE: function (value) {
                return constants.CONTROL_TYPE_GRID;
            }
        }, GridControlModel = BaseControlModel.extend({
            C: $.extend(C, BaseControlModel.prototype.C)
        });

    return GridControlModel;
});
