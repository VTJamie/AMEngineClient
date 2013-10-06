/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basecontrolmodel', 'complexitemlistdetailsmodel'], function (
    Backbone, CM, BaseControlModel, ComplexItemListDetailsModel) {
	"use strict";
    var constants = {
        CONTROL_TYPE_COMPLEX_ITEM_LIST: "CONTROL_TYPE_COMPLEX_ITEM_LIST"

    },
    C = {
        CONTROL_TYPE: function (value) {
            return constants.CONTROL_TYPE_COMPLEX_ITEM_LIST;
        },
        GRID_VIEW_GRID_DETAILS: ComplexItemListDetailsModel
    },
    ComplexItemListControlModel = BaseControlModel.extend({
        C: $.extend(C, BaseControlModel.prototype.C)
    });

    return ComplexItemListControlModel;
});
