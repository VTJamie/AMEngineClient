/*global $, define, require*/

define(['backbone', 'basemodel', 'controlcollection'], function (Backbone, BaseModel, ControlCollection) {
    "use strict";
    var C = {
        "CONTROL_ARRAY": ControlCollection
    }, RefreshResponseBodyModel = BaseModel.extend({
        C: $.extend(C, BaseModel.prototype.C)
    });

    return RefreshResponseBodyModel;
});
