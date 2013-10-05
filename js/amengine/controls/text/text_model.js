/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basecontrolmodel'], function (
    Backbone, CM, BaseControlModel) {

    var constants = {
        TEXT_BOX_TYPE_TEXT_BOX: "TEXT_BOX_TYPE_TEXT_BOX",
        TEXT_BOX_TYPE_TEXT_AREA: "TEXT_BOX_TYPE_TEXT_AREA",
        CONTROL_TYPE_TEXT: "CONTROL_TYPE_TEXT"
    };
    var C = {
        EDITABLE: "EDITABLE",
        REQUIRED: "REQUIRED",
        CURRENT_VALUE: "CURRENT_VALUE",
        MAX_LENGTH: "MAX_LENGTH",
        PROTECTED_TEXT_FIELD: "PROTECTED_TEXT_FIELD",
        CHANGE_TRIGGERS_REFRESH: "CHANGE_TRIGGERS_REFRESH",
        CONTROL_TYPE: function (value) {
            return constants.CONTROL_TYPE_TEXT;
        },
        TEXT_BOX_TYPE: function (value) {
            if (value === CM.get(constants.TEXT_BOX_TYPE_TEXT_BOX)) {
                return constants.TEXT_BOX_TYPE_TEXT_BOX;
            } else if (value === CM.get(constants.TEXT_BOX_TYPE_TEXT_AREA)) {
                return constants.TEXT_BOX_TYPE_TEXT_AREA;
            } else {
                return value;
            }
        },
    };

    var TextControlModel = BaseControlModel.extend({
        C: $.extend(C, BaseControlModel.prototype.C)
    });

    return TextControlModel;
});
