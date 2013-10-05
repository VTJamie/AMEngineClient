/*global $, require, define, debug, window */
define(['backbone', 'Handlebars'], function (Backbone, Handlebars) {
    "use strict";
    var FooterModel = Backbone.Model.extend({
        defaults: {
            selectedhash: '#home'
        }
    }),
        instance;
    FooterModel.getInstance = function () {
        if (!instance) {
            instance = new FooterModel();
        }
        return instance;
    };
    return FooterModel;
});
