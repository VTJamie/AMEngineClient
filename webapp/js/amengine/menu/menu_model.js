/*global $, define, require*/

define(['backbone', 'basemodel', 'menuitemcollection'], function (Backbone,
    BaseModel, MenuItemCollection) {
    "use strict";
    var C = {
            MENU_ARRAY: MenuItemCollection
        },
        MenuModel = BaseModel.extend({
            C: $.extend({}, C, BaseModel.prototype.C)
        });

    return MenuModel;
});
