/*global $, require, define, debug, window, document, Modernizr, cordova */
define(['jquery', 'backbone', 'backbone-jquerymobileview', 'app', 'hbs!common/header/panel/template_panel'], function ($, Backbone, jqmView, App, Template) {
    "use strict";
    var PanelView = jqmView.extend({
        initialize: function (options) {
            this.options = $.extend({
                panelid: "panel-id"
            }, options);
            this.model = new Backbone.Model(this.options);
            jqmView.prototype.initialize.apply(this, arguments);
        },
        model: undefined,
        template: Template,
        render: function () {
            jqmView.prototype.render.apply(this, arguments);
            return this.el;
        },
        attributes: {
            'data-theme': 'a'
        },
        events: Modernizr.touch ? {

        } : {

        }
    });

    return PanelView;
});
