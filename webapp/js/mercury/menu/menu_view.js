/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'menurequestmodel', 'menuitemview', 'hbs!menutemplate', 'app'], function ($, jqM, Backbone, MenuRequest, MenuListItemView, MenuTemplate, App) {
    "use strict";
    var C = {
            MENU: "MENU",
            MENU_ARRAY: "MENU_ARRAY"
        },
        MenuView = Backbone.View.extend({
            initialize: function () {
                App.vent.on("menu:reload", this.menuReload, this);
            },
            template: MenuTemplate,
            model: MenuRequest,
            render: function () {
                var that = this, menuarray, curmodel, curview, $thisul, idx;
                this.model.request(function (model) {
                    that.$el.empty().html(that.template(model.toJSON()));
                    $thisul = that.$el.find('> ul');
                    menuarray = model.get(C.MENU).get(C.MENU_ARRAY);
                    for (idx = 0; idx < menuarray.length; idx += 1) {
                        curmodel = menuarray.at(idx);
                        curview = new MenuListItemView();
                        curview.model = curmodel;
                        $thisul.append(curview.render());
                    }

                    that.$el.trigger('create');
                });

                return this.el;
            }
        });
    return MenuView;
});
