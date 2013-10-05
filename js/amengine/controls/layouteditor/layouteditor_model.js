/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basecontrolmodel'], function (
    Backbone, CM, BaseControlModel) {

    var constants = {
        CONTROL_TYPE_LAYOUT_EDITOR: "CONTROL_TYPE_LAYOUT_EDITOR"
    };
    var C = {

        CONTROL_TYPE: function (value) {
            return constants.CONTROL_TYPE_LAYOUT_EDITOR;
        }
    };

    var LayoutEditorControlModel = BaseControlModel.extend({
        C: $.extend(C, BaseControlModel.prototype.C)
    });

    return LayoutEditorControlModel;
});
