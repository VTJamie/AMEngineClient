/*global $, define, require*/

define(['backbone', 'basemodel'], function (Backbone, BaseModel) {
    "use strict";
    var C = {
        ERROR_MESSAGE: "ERROR_MESSAGE",
        ERROR_FIELD: "ERROR_FIELD"
    }, ErrorModel = BaseModel.extend({
        C: $.extend(C, BaseModel.prototype.C)
    });

    return ErrorModel;
});
