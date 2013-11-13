/*global $, define, require*/

define(['backbone'], function (Backbone) {
    "use strict";
    var MenuItemCollection = Backbone.Collection.extend({
            model: function (attrs, options) {
                var MenuItemModel = require('menuitemmodel');
                return new MenuItemModel(attrs, options);
            }
        });

    return MenuItemCollection;
});
