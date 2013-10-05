/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'selectitemmodel'], function (
    Backbone, CM, SelectItemModel) {

    var constants = {

    };

    var SelectItemCollection = Backbone.Collection.extend({
        model: SelectItemModel
    });

    return SelectItemCollection;
});
