define(['jquery', 'jquerymobile', 'backbone', 'backbone-jquerymobileview'], function ($, jqM, Backbone, jqmView) {
    "use strict";
    Backbone.JQueryMobileFooter = jqmView.extend({
            viewInDOM: function () {
                //	this.$el.trigger('create');
            },
            attributes: {
                'data-role': 'footer'
            }
        });
    return Backbone.JQueryMobileFooter;
});
