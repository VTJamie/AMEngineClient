/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'controlviewcollection'], function (
    $, jqM, Backbone, ControlViewCollection) {
    
    var BaseControlView = Backbone.View.extend({
        initialize: function (options) {
            if (typeof options !== "undefined") {
                this.model = options.model;
            }
            ControlViewCollection.getCurrentInstance().add({view: this});            
        },
        render: function () {

            this.$el.empty().append(this.template(this.model.toJSON()));
			this.$el.trigger("create");
            return this.el;
        },
        attributes: {
        	'data-role': 'fieldcontain'
        },
        getValue: function(){
        	debug.log('Control getValue not overridden');
        	return {};
        }
    });
    return BaseControlView;
});
