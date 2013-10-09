/*global $, define, require*/

define(['backbone', 'basemodel'], function (Backbone, BaseModel) {
    "use strict";
    var C = {
        DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_TARGET: "DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_TARGET",
        DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_VALUE: "DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_VALUE"
    }, PageMenuFieldStaticCouplingModel = BaseModel.extend({
        C: $.extend(C, BaseModel.prototype.C)
    });

    return PageMenuFieldStaticCouplingModel;
});
