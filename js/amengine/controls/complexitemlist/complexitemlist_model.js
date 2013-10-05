/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basecontrolmodel'], function (
    Backbone, CM, BaseControlModel) {
	"use strict";
    var constants = {
        CONTROL_TYPE_COMPLEX_ITEM_LIST: "CONTROL_TYPE_COMPLEX_ITEM_LIST"
    },
    C = {

        CONTROL_TYPE: function (value) {
            return constants.CONTROL_TYPE_COMPLEX_ITEM_LIST;
        }
    },
    ComplexItemListControlModel = BaseControlModel.extend({
        C: $.extend(C, BaseControlModel.prototype.C)
    });

    return ComplexItemListControlModel;
});
