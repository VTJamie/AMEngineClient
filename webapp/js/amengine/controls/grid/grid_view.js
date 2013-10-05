/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'basecontrolview', 'hbs!gridtemplate'], function (
    $, jqM, Backbone, BaseControlView, Template) {
	"use strict";
    var C = {
      

    },
        GridView = BaseControlView.extend({
            initialize: function (options) {
                BaseControlView.prototype.initialize.apply(this, arguments);
                this.template = Template;                
            },
            attributes: {
            	 "class": "ui-corner-all amengine-table"	
            },
            
        });
    return GridView;
});
