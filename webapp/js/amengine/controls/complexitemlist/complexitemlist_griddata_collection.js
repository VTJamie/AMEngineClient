/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'complexitemlistgriddatamodel'], function (Backbone, CM, ComplexItemListGridDataModel) {
    "use strict";
    var constants = {

    }, ComplexItemListGridDataCollection = Backbone.Collection.extend({
        model: ComplexItemListGridDataModel
    });

    return ComplexItemListGridDataCollection;
});
