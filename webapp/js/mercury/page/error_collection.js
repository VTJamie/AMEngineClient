/*global $, define, require*/

define(['backbone', 'errormodel'], function (Backbone, ErrorModel) {
    "use strict";
    var ErrorCollection = Backbone.Collection.extend({
        model: ErrorModel
    });

    return ErrorCollection;
});
