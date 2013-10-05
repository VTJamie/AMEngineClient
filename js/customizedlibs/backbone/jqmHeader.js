define(['jquery', 'jquerymobile', 'backbone', 'backbone-jquerymobileview'], function ($, jqM, Backbone, jqmView) {
    "use strict";
    Backbone.JQueryMobileHeader = jqmView.extend({
            viewInDOM: function () {},
            attributes: {
                'data-role': 'header'
            }
        });

    return Backbone.JQueryMobileHeader;
});
