/*global $, define, require*/

define(['require', 'backbone', 'constantsrequestmodel', 'basecontrolmodel'], function (
    RequireNow, Backbone, CM, BaseControlModel) {
    var LazyCollection, constants, C;
    require(['layouteditoritemcollection'], function (collectionval) {
        LazyCollection = collectionval;
    }),
    constants = {
        CONTROL_LAYOUT_EDITOR_ITEM_TYPE_ITEM: "CONTROL_LAYOUT_EDITOR_ITEM_TYPE_ITEM",
        CONTROL_LAYOUT_EDITOR_ITEM_TYPE_GROUP: "CONTROL_LAYOUT_EDITOR_ITEM_TYPE_GROUP"
    };
    C = {
        CONTROL_LAYOUT_EDITOR_ITEM_IDENTIFIER: "CONTROL_LAYOUT_EDITOR_ITEM_IDENTIFIER",
        CONTROL_LAYOUT_EDITOR_ITEM_CHILD_ITEMS: function(value) {
            return new LazyCollection(value);
        },
        CONTROL_LAYOUT_EDITOR_ITEM_NUMBER_OF_COLUMNS: "CONTROL_LAYOUT_EDITOR_ITEM_NUMBER_OF_COLUMNS",
        CONTROL_LAYOUT_EDITOR_ITEM_TYPE: function (value) {
            var returnvalue;
            if (value === CM.get(constants.CONTROL_LAYOUT_EDITOR_ITEM_TYPE_ITEM)) {
                returnvalue = constants.CONTROL_LAYOUT_EDITOR_ITEM_TYPE_ITEM;
            } else if (value === CM.get(constants.CONTROL_LAYOUT_EDITOR_ITEM_TYPE_GROUP)) {
                returnvalue = constants.CONTROL_LAYOUT_EDITOR_ITEM_TYPE_GROUP;
            } else {
                returnvalue = value;
            }
            return returnvalue;
        }
    };
    LayoutEditorItemModel = BaseControlModel.extend({
        C: $.extend({}, C, BaseControlModel.prototype.C)
    });

    return LayoutEditorItemModel;
});
