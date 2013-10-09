/*global $, define, require*/

define(['backbone', 'pagemenuitemmodel'], function (Backbone, PageMenuItemModel) {

    var PageMenuItemCollection = Backbone.Collection.extend({
        model: function(attrs, options){      
            PageMenuItemModel = require('pagemenuitemmodel');
            return new PageMenuItemModel(attrs, options);
        }
    });

    return PageMenuItemCollection;
});
