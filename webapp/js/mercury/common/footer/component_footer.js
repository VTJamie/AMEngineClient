/*global $, require, define, debug, window */
define(['backbone', 'backbone-jquerymobilefooter', 'app', 'hbs!common/footer/template_footer'], function (Backbone, jqmFooter, App, Template) {
    "use strict";
    var FooterView = jqmFooter.extend({
        initialize: function (options) {
            jqmFooter.prototype.initialize.apply(this, arguments);
        },
        template: Template,
        attributes: {
            'data-role': 'footer',
            'data-theme': 'a',
            'data-position': 'fixed',
            'data-tap-toggle': false
        },
        render: function () {
            jqmFooter.prototype.render.apply(this, arguments);
            return this.el;
        },
        events: {

        },
        model: undefined
    });

    return FooterView;
});
