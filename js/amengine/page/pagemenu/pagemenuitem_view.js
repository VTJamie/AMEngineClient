/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'app', 'hbs!pagemenuitemtemplate'], function (
    $, jqM, Backbone, App, Template) {
    "use strict";

    var constants = {
       DATA_OBJECT_MENU_FIELD_DATA_COUPLINGS: "DATA_OBJECT_MENU_FIELD_DATA_COUPLINGS",
		
		DATA_OBJECT_MENU_FIELD_STATIC_COUPLINGS: "DATA_OBJECT_MENU_FIELD_STATIC_COUPLINGS",
		
		MENU_ITEM_NAME: "MENU_ITEM_NAME",
		MENU_ITEM_ACTION: "MENU_ITEM_ACTION"
    },
        MenuListItem = Backbone.View.extend({
            template: Template,
            events: {
                'tap a': 'menuItemClicked'
            },
            tagName: 'li',
            render: function () {                	
                this.$el.html(this.template(this.model.toJSON()));                                        
                this.$el.addClass('amengine-nopadding');                	                                
                this.$el.trigger("create");
                return this.el;
            },
            menuItemClicked: function (event) {            	            	
            		if(this.model.get(constants.MENU_ITEM_ACTION) === ""){            			
            			event.stopPropagation();
            		}            	            	                
            },
            attributes: {
            	'data-mini': true       	
            }
        });
    return MenuListItem;
});
