/*global define, debug */

define(['textview', 'selectview', 'buttonview', 'complexitemlistview', 'dateview', 'gridview', 'layouteditorview', 'workflowindicatorview', 'filecontrolview'], function (TextView, SelectView, ButtonView, ComplexItemListView, DateView, GridView, LayoutEditorView, WorkflowIndicatorView, FileView) {
    "use strict";
    var C = {
            CONTROL_TYPE: "CONTROL_TYPE",
            CONTROL_TYPE_TEXT: "CONTROL_TYPE_TEXT",
            CONTROL_TYPE_DATE: "CONTROL_TYPE_DATE",
            CONTROL_TYPE_SELECT: "CONTROL_TYPE_SELECT",
            // CONTROL_TYPE_FILTER_CRITERIA: "CONTROL_TYPE_FILTER_CRITERIA",
            CONTROL_TYPE_GRID: "CONTROL_TYPE_GRID",
            CONTROL_TYPE_BUTTON: "CONTROL_TYPE_BUTTON",
            // CONTROL_TYPE_GROUP: "CONTROL_TYPE_GROUP",
            CONTROL_TYPE_COMPLEX_ITEM_LIST: "CONTROL_TYPE_COMPLEX_ITEM_LIST",
            CONTROL_TYPE_FILE: "CONTROL_TYPE_FILE",
            CONTROL_TYPE_WORKFLOW_INDICATOR: "CONTROL_TYPE_WORKFLOW_INDICATOR",
            CONTROL_TYPE_LAYOUT_EDITOR: "CONTROL_TYPE_LAYOUT_EDITOR"
        };
    return function (controlmodel) {
        var returncontrol;
        if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_TEXT) {
            returncontrol = new TextView({model: controlmodel});
        } else if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_SELECT) {
            returncontrol = new SelectView({model: controlmodel});
        } else if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_BUTTON) {
            returncontrol = new ButtonView({model: controlmodel});
        } else if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_DATE) {
            returncontrol = new DateView({model: controlmodel});
        } else if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_GRID) {
            returncontrol = new GridView({model: controlmodel});
        } else if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_COMPLEX_ITEM_LIST) {
            returncontrol = new ComplexItemListView({model: controlmodel});
        } else if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_FILE) {
            returncontrol = new FileView({model: controlmodel});
        } else if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_WORKFLOW_INDICATOR) {
            returncontrol = new WorkflowIndicatorView({model: controlmodel});
        } else if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_LAYOUT_EDITOR) {
            returncontrol = new LayoutEditorView({model: controlmodel});
        }
        returncontrol.render();
        if (typeof returncontrol.onShow === "function") {
            returncontrol.onShow();
        }
        return returncontrol.el;
    };
});
