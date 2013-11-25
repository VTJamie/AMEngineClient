/*global $, define, require*/

define(['backbone', 'basemodel'], function (Backbone, BaseModel) {
    "use strict";
    var C = {

        DATA_OBJECT_MENU_FIELD_DATA_COUPLING_TARGET: "DATA_OBJECT_MENU_FIELD_DATA_COUPLING_TARGET",
        DATA_OBJECT_MENU_FIELD_DATA_COUPLING_SOURCE: "DATA_OBJECT_MENU_FIELD_DATA_COUPLING_SOURCE"
    }, PageMenuFieldDataCouplingModel = BaseModel.extend({
        C: $.extend(C, BaseModel.prototype.C)
    });

    return PageMenuFieldDataCouplingModel;
});
