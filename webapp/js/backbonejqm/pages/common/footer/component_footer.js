/*global $, require, define, debug, window */
define(['backbone', 'backbone-jquerymobilefooter', 'footermodel', 'app', 'hbs!pages/common/footer/template_footer'], function (Backbone, jqmFooter, FooterModel, App, Template) {
    "use strict";
    var FooterView = jqmFooter.extend({
        initialize: function (options) {
            this.options = $.extend({
                modelvalues: {
                    selectedhash: window.location.hash
                }
            }, options);
            this.model = new FooterModel(this.options.modelvalues);
            jqmFooter.prototype.initialize.apply(this, arguments);
            $(window).on("resize.footer", function () {
                var correctionratio = 1,
                    winwidth = $(window).width(),
                    winheight = $(window).height();
                if (winwidth * 0.95 < 557) {
                    correctionratio = winwidth * 0.95 / 557;
                }
                if (winheight * 0.1 < 77 && correctionratio > winheight * 0.1 / 77) {
                    correctionratio = winheight * 0.1 / 77;
                }
                $('.footer-logo', this.el).css({
                    height: 77 * correctionratio,
                    width: 557 * correctionratio
                });
            });
        },
        resize: function () {
            $(window).off("resize.footer");
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
            var correctionratio = 1,
                winwidth = $(window).width(),
                winheight = $(window).height();
            if (winwidth * 0.95 < 557) {
                correctionratio = winwidth * 0.95 / 557;
            }
            if (winheight * 0.1 < 77 && correctionratio > winheight * 0.1 / 77) {
                correctionratio = winheight * 0.1 / 77;
            }
            $('.footer-logo', this.el).css({
                height: 77 * correctionratio,
                width: 557 * correctionratio
            });
            return this.el;
        },
        events: {

        },
        model: undefined
    });

    return FooterView;
});
