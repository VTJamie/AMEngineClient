/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basecontrolmodel'], function (Backbone, CM, BaseControlModel) {
    "use strict";
    var constants = {
            CONTROL_TYPE_DATE: "CONTROL_TYPE_DATE"
        },
        C = {
            EDITABLE: "EDITABLE",
            REQUIRED: "REQUIRED",
            CURRENT_VALUE: "CURRENT_VALUE",
            CHANGE_TRIGGERS_REFRESH: "CHANGE_TRIGGERS_REFRESH",
            CONTROL_TYPE: function (value) {
                return constants.CONTROL_TYPE_DATE;
            }
        },
        DateControlModel = BaseControlModel.extend({
            C: $.extend({}, C, BaseControlModel.prototype.C)
        });

    return DateControlModel;
});
