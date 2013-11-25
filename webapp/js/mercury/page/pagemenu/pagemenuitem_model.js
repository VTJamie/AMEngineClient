/*global $, define, require*/

define(['backbone', 'basemodel', 'pagemenufielddatacouplingcollection', 'pagemenufieldstaticcouplingcollection'], function (Backbone, BaseModel, PageMenuFieldDataCouplingCollection, PageMenuFieldStaticCouplingCollection) {
    "use strict";
    var C = {
        DATA_OBJECT_MENU_FIELD_DATA_COUPLINGS: PageMenuFieldDataCouplingCollection,

        DATA_OBJECT_MENU_FIELD_STATIC_COUPLINGS: PageMenuFieldStaticCouplingCollection,

        MENU_ITEM_NAME: "MENU_ITEM_NAME",
        MENU_ITEM_ACTION: "MENU_ITEM_ACTION"
    }, PageMenuItemModel = BaseModel.extend({
        C: $.extend(C, BaseModel.prototype.C)
    });

    return PageMenuItemModel;
});
