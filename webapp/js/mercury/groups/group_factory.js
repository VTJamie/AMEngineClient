/*global $, define, require*/

define([], function () {
    "use strict";
    var TableGroupView,
        CollapsibleGroupView,
        ButtonGroupView,
        C = {
            GROUP_TYPE: "GROUP_TYPE",
            GROUP_TYPE_TABLE: "GROUP_TYPE_TABLE",
            GROUP_TYPE_COLLAPSIBLE: "GROUP_TYPE_COLLAPSIBLE",
            GROUP_TYPE_BUTTON: "GROUP_TYPE_BUTTON",

            CONTROL_TYPE: "CONTROL_TYPE",
            CONTROL_TYPE_TEXT: "CONTROL_TYPE_TEXT",
            CONTROL_TYPE_DATE: "CONTROL_TYPE_DATE",
            CONTROL_TYPE_SELECT: "CONTROL_TYPE_SELECT",
            CONTROL_TYPE_FILTER_CRITERIA: "CONTROL_TYPE_FILTER_CRITERIA",
            CONTROL_TYPE_GRID: "CONTROL_TYPE_GRID",
            CONTROL_TYPE_BUTTON: "CONTROL_TYPE_BUTTON",
            CONTROL_TYPE_GROUP: "CONTROL_TYPE_GROUP",
            CONTROL_TYPE_COMPLEX_ITEM_LIST: "CONTROL_TYPE_COMPLEX_ITEM_LIST",
            CONTROL_TYPE_FILE: "CONTROL_TYPE_FILE",
            CONTROL_TYPE_WORKFLOW_INDICATOR: "CONTROL_TYPE_WORKFLOW_INDICATOR",
            CONTROL_TYPE_LAYOUT_EDITOR: "CONTROL_TYPE_LAYOUT_EDITOR"
        };
    require(['tablegroupview', 'collapsiblegroupview', 'buttongroupview'], function (tgv, cgv, bgv) {
        TableGroupView = tgv;
        CollapsibleGroupView = cgv;
        ButtonGroupView = bgv;
    });

    return function (groupmodel) {
        var returnvalue;
        if (groupmodel.get(C.GROUP_TYPE) === C.GROUP_TYPE_TABLE) {
            returnvalue = new TableGroupView({
                model: groupmodel
            }).render();
        } else if (groupmodel.get(C.GROUP_TYPE) === C.GROUP_TYPE_COLLAPSIBLE) {
            returnvalue = new CollapsibleGroupView({
                model: groupmodel
            }).render();
        } else if (groupmodel.get(C.GROUP_TYPE) === C.GROUP_TYPE_BUTTON) {
            returnvalue = new ButtonGroupView({
                model: groupmodel
            }).render();
        }
        return returnvalue;
    };
});
