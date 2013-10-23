/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basecontrolmodel', 'layouteditoritemcollection'], function (
    Backbone, CM, BaseControlModel, LayoutEditorItemCollection) {

    var constants = {
       CONTROL_TYPE_LAYOUT_EDITOR: "CONTROL_TYPE_LAYOUT_EDITOR"
    };
    var C = {
        CONTROL_LAYOUT_EDITOR_ITEM_CHILD_ITEMS: LayoutEditorItemCollection,
        CONTROL_LAYOUT_EDITOR_ITEM_AVAILABLE_ITEMS: LayoutEditorItemCollection,
        CONTROL_TYPE: function (value) {
            return constants.CONTROL_TYPE_LAYOUT_EDITOR;
        }
    };

    var LayoutEditorControlModel = BaseControlModel.extend({
        C: $.extend(C, BaseControlModel.prototype.C)
    });

    return LayoutEditorControlModel;
});
