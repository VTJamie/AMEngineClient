/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basecontrolmodel',
        'selectitemcollection'
], function (Backbone, CM, BaseControlModel, SelectItemCollection) {

    var constants = {
        CONTROL_TYPE_SELECT: "CONTROL_TYPE_SELECT"
    };
    var C = {
        EDITABLE: "EDITABLE",
        REQUIRED: "REQUIRED",
        CHANGE_TRIGGERS_REFRESH: "CHANGE_TRIGGERS_REFRESH",
        SELECT_ITEMS: SelectItemCollection,
        SELECT_DISPLAY_TYPE: "SELECT_DISPLAY_TYPE",
        CONTROL_TYPE: function (value) {
            return constants.CONTROL_TYPE_SELECT;
        }
    };

    var SelectControlModel = BaseControlModel.extend({
        C: $.extend(C, BaseControlModel.prototype.C)
    });

    return SelectControlModel;
});
