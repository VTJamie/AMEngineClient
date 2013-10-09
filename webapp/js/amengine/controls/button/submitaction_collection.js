/*global $, define, require*/

define(['backbone', 'submitactionmodel'], function (Backbone, SubmitActionModel) {
    "use strict";
    var SubmitActionCollection = Backbone.Collection.extend({
        model: SubmitActionModel
    });

    return SubmitActionCollection;
});
