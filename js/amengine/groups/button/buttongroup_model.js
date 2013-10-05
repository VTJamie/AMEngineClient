/*global $, define, require*/

define(['backbone', 'basegroupmodel'], function (Backbone, BaseGroupModel) {
    var constants = {
        GROUP_TYPE_TABLE: "GROUP_TYPE_TABLE",
        GROUP_TYPE_COLLAPSIBLE: "GROUP_TYPE_COLLAPSIBLE",
        GROUP_TYPE_BUTTON: "GROUP_TYPE_BUTTON",
    };
    var C = {
        "GROUP_TYPE": function (value) {
            return constants.GROUP_TYPE_BUTTON;
        }
    };

    var ButtonGroupModel = BaseGroupModel.extend({
        C: $.extend(C, BaseGroupModel.prototype.C)
    });

    return ButtonGroupModel;
});
