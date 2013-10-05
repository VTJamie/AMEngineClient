/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'factory', 'hbs!buttongrouptemplate'], function ($, jqM, Backbone, Factory, Template) {
	"use strict";
	var C = {
		CONTROL_ARRAY: "CONTROL_ARRAY"
	}, ButtonGroupView = Backbone.View.extend({
		initialize: function (options) {
			if ( typeof options !== "undefined") {
				this.model = options.model;
			}
		},
		render: function () {
			this.$el.empty().append(Template(this.model.toJSON()));
			var controlarray = this.model.get(C.CONTROL_ARRAY);
			for (var idx = 0; idx < controlarray.length; idx++) {
				var newitem = Factory(controlarray.at(idx));
				this.$el.append(newitem);
			}
			this.$el.trigger("create");
			return this.el;
		},
		attributes: {
			'data-role': 'controlgroup',
			'data-type': 'horizontal',
			'class': 'amengine-buttongroup'
		}
	});
	return ButtonGroupView;
});
