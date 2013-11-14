/*global $, define, require, debug*/

define(['backbone', 'constantsrequestmodel', 'tablegroupmodel', 'collapsiblegroupmodel', 'buttongroupmodel', 'basemodel'], function (Backbone, CM, TableGroupModel, CollapsibleGroupModel, ButtonGroupModel, BaseModel) {
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
            MAIN_REQUEST_OBJECT_ID: "MAIN_REQUEST_OBJECT_ID",
            MAIN_REQUEST_FIELD_NAME: "MAIN_REQUEST_FIELD_NAME",
            ROOT_OBJECT: function (attrs) {

                if (attrs[CM.get(constants.GROUP_TYPE)] === constants.GROUP_TYPE_TABLE ||
                        attrs[CM.get(constants.GROUP_TYPE)] === CM.get(constants.GROUP_TYPE_TABLE) ||
                        attrs[constants.GROUP_TYPE] === constants.GROUP_TYPE_TABLE ||
                        attrs[constants.GROUP_TYPE] === CM.get(constants.GROUP_TYPE_TABLE)) {
                    return new TableGroupModel(attrs);
                }
                if (attrs[CM.get(constants.GROUP_TYPE)] === constants.GROUP_TYPE_COLLAPSIBLE ||
                        attrs[CM.get(constants.GROUP_TYPE)] === CM.get(constants.GROUP_TYPE_COLLAPSIBLE) ||
                        attrs[constants.GROUP_TYPE] === constants.GROUP_TYPE_COLLAPSIBLE ||
                        attrs[constants.GROUP_TYPE] === CM.get(constants.GROUP_TYPE_COLLAPSIBLE)) {
                    return new CollapsibleGroupModel(attrs);
                }
                if (attrs[CM.get(constants.GROUP_TYPE)] === constants.GROUP_TYPE_BUTTON ||
                        attrs[CM.get(constants.GROUP_TYPE)] === CM.get(constants.GROUP_TYPE_BUTTON) ||
                        attrs[constants.GROUP_TYPE] === constants.GROUP_TYPE_BUTTON ||
                        attrs[constants.GROUP_TYPE] === CM.get(constants.GROUP_TYPE_BUTTON)) {
                    return new ButtonGroupModel(attrs);
                }

                debug.log('Group Dropped Through', attrs);

            }
        },
        DialogResponseBodyModel = BaseModel.extend({
            C: $.extend({}, C, BaseModel.prototype.C)
        });

    return DialogResponseBodyModel;
});
