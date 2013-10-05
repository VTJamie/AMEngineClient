/*global $, define, require*/

define(['backbone', 'menuitemmodel'], function (Backbone, MenuItemModel) {

    var MenuItemCollection = Backbone.Collection.extend({
        model: function(attrs, options){      
        	MenuItemModel = require('menuitemmodel');   
        	return new MenuItemModel(attrs, options);
    	}
    });

    return MenuItemCollection;
});
