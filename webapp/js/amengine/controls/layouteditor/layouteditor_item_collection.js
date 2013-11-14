/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'layouteditoritemmodel'], function (Backbone, CM, LayoutEditorItemModel) {
    "use strict";
    var LayoutEditorItemCollection = Backbone.Collection.extend({
        model: LayoutEditorItemModel
    });

    return LayoutEditorItemCollection;
});
