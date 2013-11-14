/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'selectitemmodel'], function (Backbone, CM, SelectItemModel) {
    "use strict";

    var SelectItemCollection = Backbone.Collection.extend({
        model: SelectItemModel
    });

    return SelectItemCollection;
});
