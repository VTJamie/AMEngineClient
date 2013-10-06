/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'menurequestmodel', 'menuitemview', 'hbs!menutemplate', 'app'], function ($, jqM, Backbone, MenuRequest, MenuListItemView, MenuTemplate, App) {
	"use strict";
	var C = {
		MENU: "MENU",
		MENU_ARRAY: "MENU_ARRAY"
	}, MenuView = Backbone.View.extend({
		initialize: function () {
			this.model = MenuRequest;
			App.vent.on("menu:reload", this.menuReload, this);
		},

		render: function () {
			var that = this, menuarray, curmodel, curview, $thisul;
			this.model.request(function (model) {
				that.$el.empty().html(MenuTemplate(model.toJSON()));
				$thisul = that.$el.find('> ul');
				menuarray = model.get(C.MENU).get(C.MENU_ARRAY);
				for (var idx = 0; idx < menuarray.length; idx++) {
					curmodel = menuarray.at(idx);
					curview = new MenuListItemView ();
					curview.model = curmodel;
					$thisul.append(curview.render());
				}
				//$thisul.listview();
				that.$el.trigger('create');
			});

			return this.el;
		},
		menuReload: function () {
			this.render();
		}
	});
	return MenuView;
});
