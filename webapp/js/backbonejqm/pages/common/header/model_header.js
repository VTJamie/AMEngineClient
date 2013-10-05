/*global $, require, define, debug, window */
define(['backbone', 'Handlebars'], function (Backbone, Handlebars) {
    "use strict";
    var HeaderModel = Backbone.Model.extend({
            defaults: {
                leftbutton: true,
                rightbutton: false,
                title: new Handlebars.SafeString("BackbonejQM")
            }
        }),
        instance;
    HeaderModel.getInstance = function () {
        if (!instance) {
            instance = new HeaderModel();
        }
        return instance;
    };
    return HeaderModel;
});
