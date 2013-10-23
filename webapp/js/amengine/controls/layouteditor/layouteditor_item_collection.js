/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'layouteditoritemmodel'], function (
    Backbone, CM, LayoutEditorItemModel) {

    var constants = {

    };
    var LayoutEditorItemCollection = Backbone.Collection.extend({
        model: LayoutEditorItemModel
    });

    return LayoutEditorItemCollection;
});
