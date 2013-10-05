/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'menuitemview', 'hbs!submenutemplate', 'app'], function ($, jqM, Backbone, MenuListItemView, SubMenuTemplate, App) {"use strict";
	var C = {

		MENU_ITEM_SUB_LIST: "MENU_ITEM_SUB_LIST"
	}, SubMenuView = Backbone.View.extend({
		initialize: function (options) {
			this.options = $.extend({}, options);
			this.model = this.options.model;
		},

		render: function () {
			var that = this, menuarray, curmodel, curview, $thisul;

			that.$el.empty().html(SubMenuTemplate(that.model.toJSON()));
			$thisul = that.$el.find('> ul');
			
			menuarray = that.model.get(C.MENU_ITEM_SUB_LIST);
			for (var idx = 0; idx < menuarray.length; idx++) {
				curmodel = menuarray.at(idx);
				curview = new MenuListItemView ();
				curview.model = curmodel;
				$thisul.append(curview.render());
			}
			//$thisul.listview();
			this.$el.trigger("create");
			return this.el;
		},
		menuReload: function () {
			this.render();
		}
	});
	return SubMenuView;
});
