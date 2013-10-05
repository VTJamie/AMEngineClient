/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'controlcollection', 'basemodel'], function (
    Backbone, CM, ControlCollection, BaseModel) {

    var constants = {
        GROUP_TYPE_TABLE: "GROUP_TYPE_TABLE",
        GROUP_TYPE_COLLAPSIBLE: "GROUP_TYPE_COLLAPSIBLE",
        GROUP_TYPE_BUTTON: "GROUP_TYPE_BUTTON",
    };
    var C = {
        "GROUP_ID": "GROUP_ID",
        "GROUP_NAME": "GROUP_NAME",
        "CONTROL_ARRAY": ControlCollection
    };

    var BaseGroupModel = BaseModel.extend({
        C: $.extend(C, BaseModel.prototype.C)
    });

    return BaseGroupModel;
});
