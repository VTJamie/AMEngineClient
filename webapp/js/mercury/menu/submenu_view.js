/*global $, define, require*/
/*jslint forin: true */
define(['jquery', 'jquerymobile', 'backbone', 'hbs!submenutemplate', 'app'], function ($, jqM, Backbone, SubMenuTemplate, App) {
    "use strict";
    var C = {
            MENU_ITEM_SUB_LIST: "MENU_ITEM_SUB_LIST"
        },
        SubMenuView = Backbone.View.extend({
            initialize: function (options) {
                this.options = $.extend({}, options);
                this.model = this.options.model;
            },
            template: SubMenuTemplate,
            render: function () {
                var that = this, menuarray, curmodel, curview, $thisul, idx, MenuListItemView = require('menuitemview');

                that.$el.empty().html(this.template(that.model.toJSON()));
                $thisul = that.$el.find('> ul');

                menuarray = that.model.get(C.MENU_ITEM_SUB_LIST);
                for (idx = 0; idx < menuarray.length; idx += 1) {
                    curmodel = menuarray.at(idx);
                    curview = new MenuListItemView();
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
