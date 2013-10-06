/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'hbs!pagetemplate', 'factory', 'controlviewcollection', 'pagemenuview', 'pagecontainer', 'menuview'], function ($, jqM, Backbone, Template, Factory, ControlViewCollection, PageMenuView, PageContainer, MenuView) {
	"use strict";
	var constants = {
		RESPONSE_BODY: "RESPONSE_BODY",
		ROOT_OBJECT: "ROOT_OBJECT",
		MENU_ARRAY: "MENU_ARRAY"
	}, PageView = PageContainer.extend({
	    initialize: function(options) {
            PageContainer.prototype.initialize.apply(this, arguments);
            this.responseobject = options.model;
	    },
	    template: Template,
		render: function () {
		    PageContainer.prototype.render.apply(this, arguments);
			var that = this,
			$content =  this.getContent(),
			$menu = this.getMenu();

			$menu.append(new MenuView().render());

			ControlViewCollection.getCurrentInstance().reset();

			if(that.responseobject.get(constants.RESPONSE_BODY).get(constants.MENU_ARRAY) !== undefined) {
                $content.append(new PageMenuView ({
                    model: that.responseobject.get(constants.RESPONSE_BODY).get(constants.MENU_ARRAY)
                }).render());
            }
            $content.append(Factory(that.responseobject.get(constants.RESPONSE_BODY).get(constants.ROOT_OBJECT)));
			return this.el;
		},
		events: $.extend({
		    'tap #panel-toggle': 'panelToggle'
		}, PageContainer.prototype.events),

		panelToggle: function(e) {
		    this.getMenu().panel().panel('open');
		    e.preventDefault();
		    return false;
		},
		getHeader: function () {
			return this.$el.find('> :jqmData(role=header)');
		},
		getMenu: function () {
			return this.$el.find('> :jqmData(role=panel)');
		},
		getContent: function () {
			return this.$el.find('> :jqmData(role=content)');
		},
		getFooter: function () {
			return this.$el.find('> :jqmData(role=footer)');
		},
		attributes: $.extend({
			'class': "type-interior"
        }, PageContainer.prototype.attributes)
	});
	return PageView;
});
