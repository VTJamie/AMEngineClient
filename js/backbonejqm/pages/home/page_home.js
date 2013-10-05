/*global $, require, define, debug, window */
define(['backbone', 'pagecontainer', 'header', 'footer', 'hbs!pages/home/template_home'], function (Backbone, PageContainer, Header, Footer, Template) {
    "use strict";
    var HomePage = PageContainer.extend({
        initialize: function (options) {
            PageContainer.prototype.initialize.apply(this, arguments);
        },
        template: Template
    });

    return HomePage;
});
