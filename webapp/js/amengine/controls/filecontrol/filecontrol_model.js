/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basecontrolmodel'], function (Backbone, CM, BaseControlModel) {
    "use strict";
    var constants = {
        CONTROL_TYPE_FILE: "CONTROL_TYPE_FILE"
    };
    var C = {
        EDITABLE: "EDITABLE",
        REQUIRED: "REQUIRED",
        CURRENT_VALUE: "CURRENT_VALUE",
        MAX_FILE_SIZE: "MAX_FILE_SIZE",
        FILE_NAME: "FILE_NAME",
        PROTECTED_TEXT_FIELD: "PROTECTED_TEXT_FIELD",
        CHANGE_TRIGGERS_REFRESH: "CHANGE_TRIGGERS_REFRESH",
        CONTROL_TYPE: function (value) {
            return constants.CONTROL_TYPE_FILE;
        },
    },
        FileControlModel = BaseControlModel.extend({
            C: $.extend(C, BaseControlModel.prototype.C)
        });

    return FileControlModel;
});
