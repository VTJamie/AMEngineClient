/*global $, require, define, debug, window */
define(['jquery', 'jquerymobile', 'backbone', 'marionette'], function ($, jqMobile, Backbone, Marionette) {
    "use strict";
    var Router = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            '': 'openPage_Home'
        }
    });
    return Router;
});
