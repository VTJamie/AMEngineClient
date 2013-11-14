/*global $, define, require*/

define(['backbone', 'basemodel'], function (Backbone, BaseModel) {
    "use strict";
    var C = {
            ID: "ID",
            LABEL: "LABEL",
            IS_VISIBLE: "IS_VISIBLE"
        },
        BaseControlModel = BaseModel.extend({
            C: $.extend({}, C, BaseModel.prototype.C)
        });

    return BaseControlModel;
});
