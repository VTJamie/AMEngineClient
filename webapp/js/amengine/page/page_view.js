/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'hbs!pagetemplate', 'factory', 'controlviewcollection', 'pagemenuview'], function ($, jqM, Backbone, Template, Factory, ControlViewCollection, PageMenuView) {
	"use strict";
	var constants = {
		RESPONSE_BODY: "RESPONSE_BODY",
		ROOT_OBJECT: "ROOT_OBJECT",
		MENU_ARRAY: "MENU_ARRAY"
	}, PageView = Backbone.View.extend({
		render: function () {
			var that = this;
			that.$el.empty().html(Template({}));
			return this.el;
		},
		loadContentView: function (responseobject) {
			ControlViewCollection.getCurrentInstance().reset();

			this.getContent().empty().append(new PageMenuView ({
				model: responseobject.get(constants.RESPONSE_BODY).get(constants.MENU_ARRAY)
			}).render())
			.append(Factory(responseobject.get(constants.RESPONSE_BODY).get(constants.ROOT_OBJECT)));
			this.$el.trigger("create");
		},
		getHeader: function () {
			return this.$el.find('> :jqmData(role=header)');
		},
		getMenu: function () {
			return this.$el.find('> :jqmData(role=content) > .content-secondary');
		},
		getContent: function () {
			return this.$el.find('> :jqmData(role=content) > .content-primary');
		},
		getFooter: function () {
			return this.$el.find('> :jqmData(role=footer)');
		},
		attributes: {
			'data-role': 'page',
			'class': "type-interior"
		}
	});
	return PageView;
});
