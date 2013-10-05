/*global $, define, require*/

define(['backbone', 'basemodel'], function (Backbone, BaseModel) {
	"use strict";
    var C = {
        MENU_ITEM_TRANSFER_VALUES_FIELD: "MENU_ITEM_TRANSFER_VALUES_FIELD",
        MENU_ITEM_TRANSFER_VALUES_VALUE: "MENU_ITEM_TRANSFER_VALUES_VALUE"
    },
    MenuItemModel = BaseModel.extend({
        C: $.extend(C, BaseModel.prototype.C)

    });

    return MenuItemModel;
});
