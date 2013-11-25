/*global $, define, require, debug*/

define(['jquery', 'jquerymobile', 'backbone', 'app', 'hbs!pagemenuitemtemplate', 'controlviewcollection'], function ($, jqM, Backbone, App, Template, ControlViewCollection) {
    "use strict";
    var constants = {
            DATA_OBJECT_MENU_FIELD_DATA_COUPLINGS: "DATA_OBJECT_MENU_FIELD_DATA_COUPLINGS",
            DATA_OBJECT_MENU_FIELD_STATIC_COUPLINGS: "DATA_OBJECT_MENU_FIELD_STATIC_COUPLINGS",
            DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_VALUE: "DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_VALUE",
            DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_TARGET: "DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_TARGET",
            DATA_OBJECT_MENU_FIELD_DATA_COUPLING_TARGET: "DATA_OBJECT_MENU_FIELD_DATA_COUPLING_TARGET",
            DATA_OBJECT_MENU_FIELD_DATA_COUPLING_SOURCE: "DATA_OBJECT_MENU_FIELD_DATA_COUPLING_SOURCE",
            MENU_ITEM_NAME: "MENU_ITEM_NAME",
            MENU_ITEM_ACTION: "MENU_ITEM_ACTION"
        },
        MenuListItem = Backbone.View.extend({
            template: Template,
            events: {
                'tap': 'menuItemClicked'
            },
            tagName: 'li',
            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                this.$el.addClass('mercury-nopadding');
                this.$el.trigger("create");
                return this.el;
            },
            menuItemClicked: function (event) {
                var hash = ["#"],
                    controlcollection = ControlViewCollection.getFieldValues({withoutprefix: true}),
                    returnvalue;

                if (this.model.get(constants.MENU_ITEM_ACTION) === "") {
                    event.stopPropagation();
                    event.preventDefault();
                    returnvalue = false;
                } else {
                    hash.push(this.model.get(constants.MENU_ITEM_ACTION));
                    this.model.get(constants.DATA_OBJECT_MENU_FIELD_STATIC_COUPLINGS).each(function (curmodel) {
                        hash.push("/");
                        hash.push(encodeURI(curmodel.get(constants.DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_TARGET)));

                        hash.push("/");
                        hash.push(encodeURI(curmodel.get(constants.DATA_OBJECT_MENU_FIELD_STATIC_COUPLING_VALUE)));
                    });

                    this.model.get(constants.DATA_OBJECT_MENU_FIELD_DATA_COUPLINGS).each(function (curmodel) {
                        hash.push("/");
                        hash.push(encodeURI(curmodel.get(constants.DATA_OBJECT_MENU_FIELD_DATA_COUPLING_TARGET)));

                        hash.push("/");
                        hash.push(encodeURI(controlcollection[curmodel.get(constants.DATA_OBJECT_MENU_FIELD_DATA_COUPLING_SOURCE)]));
                    });
                    debug.log(controlcollection, hash.join(""));
                    $(event.target).closest('a').attr('href', hash.join(""));
                    returnvalue = true;
                }
                return returnvalue;
            },
            attributes: {
                'data-mini': true
            }
        });
    return MenuListItem;
});
