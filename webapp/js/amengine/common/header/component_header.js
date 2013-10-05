/*global $, require, define, debug, window, document, Modernizr */
define(['jquery', 'backbone', 'modernizr', 'backbone-jquerymobileheader', 'app', 'hbs!common/header/template_header'], function ($, Backbone, Mod, jqmHeader, HeaderModel, App, Template) {
    "use strict";

    var HeaderView = jqmHeader.extend({
        initialize: function (options) {
            jqmHeader.prototype.initialize.apply(this, arguments);
        },
        model: undefined,
        template: Template,
        render: function () {
            jqmHeader.prototype.render.apply(this, arguments);

            return this.el;
        },
        attributes: {
            'data-role': 'header',
            'data-theme': 'a',
            'data-position': 'fixed',
            'data-tap-toggle': false
        },
        events: Modernizr.touch ? {
            'tap :jqmData(role=back)': 'goBack',
            'tap #panel-toggle': 'openPanel'
        } : {
            'click :jqmData(role=back)': 'goBack',
            'click #panel-toggle': 'openPanel'
        },
        goBack: function (event) {
            if (App.routesHit > 1) {
                // more than one route hit -> user did not land to current page
                // directly
                window.history.back();
            } else {
                // otherwise go to the home page. Use replaceState if available
                // so
                // the navigation doesn't create an extra history entry
                Backbone.history.navigate('', {
                    trigger: true,
                    replace: true
                });
            }
            event.preventDefault();
        },

        openPanel: function (event) {
            $('#panel-id').panel("open");
            event.preventDefault();
        }
    });

    return HeaderView;
});
