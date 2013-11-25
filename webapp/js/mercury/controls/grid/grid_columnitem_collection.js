/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'gridcolumnitemmodel'], function (Backbone, CM, GridColumnItemModel) {
    "use strict";
    var GridColumnItemCollection = Backbone.Collection.extend({
            model: GridColumnItemModel
        });

    return GridColumnItemCollection;
});
