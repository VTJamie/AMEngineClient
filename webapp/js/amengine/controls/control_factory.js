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

        if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_TEXT) {
            return new TextView({
                model: controlmodel
            }).render();
        } else if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_SELECT) {
            return new SelectView({
                model: controlmodel
            }).render();
        } else if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_BUTTON) {
            return new ButtonView({
                model: controlmodel
            }).render();
        } else if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_DATE) {
            return new DateView({
                model: controlmodel
            }).render();
        } else if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_GRID) {
            return new GridView({
                model: controlmodel
            }).render();

        } else if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_COMPLEX_ITEM_LIST) {
            return new ComplexItemListView({
                model: controlmodel
            }).render();

        } else if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_FILE) {
            return new FileView({
                model: controlmodel
            }).render();

        } else if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_WORKFLOW_INDICATOR) {
            return new WorkflowIndicatorView({
                model: controlmodel
            }).render();

        } else if (controlmodel.get(C.CONTROL_TYPE) === C.CONTROL_TYPE_LAYOUT_EDITOR) {
            return new LayoutEditorView({
                model: controlmodel
            }).render();
        }
    };
});
