/*global $, define, require*/

define(['backbone', 'menutransfervaluecollection', 'menuitemcollection', 'basemodel', 'generalutility'], function (Backbone, MenuTransferValueCollection, MenuItemCollection, BaseModel, GeneralUtility) {"use strict";

	var MenuItemModel = BaseModel.extend({
		initialize: function () {		
			this.C = $.extend({
				MENU_ITEM_SUB_LIST: require('menuitemcollection'),
				MENU_ITEM_TRANSFER_VALUES: MenuTransferValueCollection,

				MENU_ITEM_NAME: "MENU_ITEM_NAME",
				MENU_ITEM_ACTION: "MENU_ITEM_ACTION",
				MENU_ITEM_IS_LOGOUT: "MENU_ITEM_IS_LOGOUT"
			}, BaseModel.prototype.C);
			BaseModel.prototype.initialize.apply(this, arguments);
			this.set({
				uniqueid: GeneralUtility.guid()
			});
		}
	});
	return MenuItemModel;
});
