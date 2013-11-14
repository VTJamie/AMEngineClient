/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'complexitemlistcolumnitemmodel'], function (Backbone, CM, ComplexItemListColumnItemModel) {
    "use strict";
    var ComplexItemListColumnItemCollection = Backbone.Collection.extend({
            model: ComplexItemListColumnItemModel
        });

    return ComplexItemListColumnItemCollection;
});
