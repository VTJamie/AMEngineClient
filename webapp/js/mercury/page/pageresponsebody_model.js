/*global $, define, require, debug*/

define(['backbone', 'constantsrequestmodel', 'tablegroupmodel', 'collapsiblegroupmodel', 'buttongroupmodel', 'pagemenuitemcollection', 'basemodel', 'app'], function (Backbone, CM, TableGroupModel, CollapsibleGroupModel, ButtonGroupModel, PageMenuItemCollection, BaseModel, App) {
    "use strict";
    var constants = {
            GROUP_TYPE: "GROUP_TYPE",
            GROUP_TYPE_TABLE: "GROUP_TYPE_TABLE",
            GROUP_TYPE_COLLAPSIBLE: "GROUP_TYPE_COLLAPSIBLE",
            GROUP_TYPE_BUTTON: "GROUP_TYPE_BUTTON"
        },
        C = {
            ID: "ID",
            IS_DIALOG: "IS_DIALOG",
            DISPLAY_NAME: "DISPLAY_NAME",
            OBJECT_NAME: "OBJECT_NAME",
            MENU_ARRAY: PageMenuItemCollection,
            ROOT_OBJECT: function (attrs) {
                var returnvalue;
                if (attrs[CM.get(constants.GROUP_TYPE)] === constants.GROUP_TYPE_TABLE ||
                        attrs[CM.get(constants.GROUP_TYPE)] === CM.get(constants.GROUP_TYPE_TABLE) ||
                        attrs[constants.GROUP_TYPE] === constants.GROUP_TYPE_TABLE ||
                        attrs[constants.GROUP_TYPE] === CM.get(constants.GROUP_TYPE_TABLE)) {
                    returnvalue =  new TableGroupModel(attrs);
                } else if (attrs[CM.get(constants.GROUP_TYPE)] === constants.GROUP_TYPE_COLLAPSIBLE ||
                        attrs[CM.get(constants.GROUP_TYPE)] === CM.get(constants.GROUP_TYPE_COLLAPSIBLE) ||
                        attrs[constants.GROUP_TYPE] === constants.GROUP_TYPE_COLLAPSIBLE ||
                        attrs[constants.GROUP_TYPE] === CM.get(constants.GROUP_TYPE_COLLAPSIBLE)) {
                    returnvalue =  new CollapsibleGroupModel(attrs);
                } else if (attrs[CM.get(constants.GROUP_TYPE)] === constants.GROUP_TYPE_BUTTON ||
                        attrs[CM.get(constants.GROUP_TYPE)] === CM.get(constants.GROUP_TYPE_BUTTON) ||
                        attrs[constants.GROUP_TYPE] === constants.GROUP_TYPE_BUTTON ||
                        attrs[constants.GROUP_TYPE] === CM.get(constants.GROUP_TYPE_BUTTON)) {
                    returnvalue =  new ButtonGroupModel(attrs);
                } else {
                    debug.log('Group Dropped Through', attrs);
                }
                return returnvalue;
            }
        },
        currentinstance,
        PageResponseBodyModel = BaseModel.extend({
            C: $.extend({}, C, BaseModel.prototype.C)
        });

    PageResponseBodyModel.getCurrentInstance = function () {
        App.vent.trigger('loadactivepage.mercury');
        return currentinstance;
    };

    PageResponseBodyModel.setCurrentInstance = function (newinstance) {
        currentinstance = newinstance;
    };

    return PageResponseBodyModel;
});
