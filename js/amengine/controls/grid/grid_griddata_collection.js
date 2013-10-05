/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'gridgriddatamodel'], function (Backbone, CM, GridGridDataModel) {
    "use strict";
    var constants = {

    }, GridGridDataCollection = Backbone.Collection.extend({
            model: GridGridDataModel
        });

    return GridGridDataCollection;
});
