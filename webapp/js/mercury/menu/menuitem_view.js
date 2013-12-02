/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'app', 'logoutrequestmodel', 'hbs!menuitemtemplate', 'submenuview'], function ($, jqM, Backbone, App, LogoutRequestModel, Template, SubMenuView) {
    "use strict";
    var constants = {
            MENU_ITEM_ACTION: "MENU_ITEM_ACTION",
            MENU_ITEM_IS_LOGOUT: "MENU_ITEM_IS_LOGOUT"
        },
        MenuListItem = Backbone.View.extend({
            template: Template,
            events: {
                'tap a': 'menuItemClicked'
            },
            tagName: 'li',
            render: function () {
                var that = this;
                this.$el.html(this.template(this.model.toJSON()));

                if (this.model.get(constants.MENU_ITEM_ACTION) === "" && !this.model.get(constants.MENU_ITEM_IS_LOGOUT)) {
                    this.$el.addClass('mercury-nopadding');
                    that.$el.find(':jqmData(role=collapsible)').append(new SubMenuView({model: that.model}).render());
                    that.$el.parent().trigger('create');
                }

                this.$el.trigger("create");
                return this.el;
            },
            menuItemClicked: function (event) {
                if (this.model.get(constants.MENU_ITEM_IS_LOGOUT)) {
                    LogoutRequestModel.request(function (model) {
                        Backbone.history.navigate('', {trigger: true});
                    });
                    event.preventDefault();
                } else {
                    if (this.model.get(constants.MENU_ITEM_ACTION) === "") {
                        event.stopPropagation();
                    }
                }

            },
            attributes: {
                'data-mini': true
            }
        });
    return MenuListItem;
});
