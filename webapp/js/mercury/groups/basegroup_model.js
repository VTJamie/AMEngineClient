/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'controlcollection', 'basemodel'], function (Backbone, CM, ControlCollection, BaseModel) {
    "use strict";
    var C = {
            "GROUP_ID": "GROUP_ID",
            "GROUP_NAME": "GROUP_NAME",
            "CONTROL_ARRAY": ControlCollection
        },
        BaseGroupModel = BaseModel.extend({
            C: $.extend({}, C, BaseModel.prototype.C)
        });

    return BaseGroupModel;
});
