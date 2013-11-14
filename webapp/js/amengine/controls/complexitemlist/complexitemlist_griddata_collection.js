/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'complexitemlistgriddatamodel'], function (Backbone, CM, ComplexItemListGridDataModel) {
    "use strict";
    var ComplexItemListGridDataCollection = Backbone.Collection.extend({
        model: ComplexItemListGridDataModel
    });

    return ComplexItemListGridDataCollection;
});
