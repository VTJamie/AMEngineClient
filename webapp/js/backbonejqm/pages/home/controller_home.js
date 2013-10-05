/*global $, require, define, debug, window */
define(['jquery', 'jquerymobile', 'backbone', 'marionette', 'app', 'pagecontainer', 'header', 'footer'], function ($, jqMobile, Backbone, Marionette, App, PageContainer, Header, Footer) {
    "use strict";
    var Controller = Backbone.Marionette.Controller.extend({
        openPage_Home: function () {
            require(['pages/home/page_home'], function (PageContent) {
                App.loadPage(new PageContent());
            });
        }
    });
    return Controller;
});
