/*global $, define, require, debug*/
/*jslint nomen: true */
define(['backbone', 'constantsrequestmodel', 'textmodel', 'selectmodel', 'buttonmodel', 'datemodel', 'complexitemlistmodel', 'gridmodel', 'layouteditormodel', 'workflowindicatormodel', 'filecontrolmodel'], function (Backbone, CM, TextControlModel, SelectControlModel, ButtonControlModel, DateControlModel, ComplexListItemControlModel, GridControlModel, LayoutEditorControlModel, WorkflowIndicatorControlModel, FileControlModel) {
    "use strict";
    var constants = {
            GROUP_TYPE: "GROUP_TYPE",
            GROUP_TYPE_TABLE: "GROUP_TYPE_TABLE",
            GROUP_TYPE_COLLAPSIBLE: "GROUP_TYPE_COLLAPSIBLE",
            GROUP_TYPE_BUTTON: "GROUP_TYPE_BUTTON",

            CONTROL_TYPE: "CONTROL_TYPE",
            CONTROL_TYPE_TEXT: "CONTROL_TYPE_TEXT",
            CONTROL_TYPE_DATE: "CONTROL_TYPE_DATE",
            CONTROL_TYPE_SELECT: "CONTROL_TYPE_SELECT",
            CONTROL_TYPE_GRID: "CONTROL_TYPE_GRID",
            CONTROL_TYPE_BUTTON: "CONTROL_TYPE_BUTTON",
            CONTROL_TYPE_GROUP: "CONTROL_TYPE_GROUP",
            CONTROL_TYPE_COMPLEX_ITEM_LIST: "CONTROL_TYPE_COMPLEX_ITEM_LIST",
            CONTROL_TYPE_WORKFLOW_INDICATOR: "CONTROL_TYPE_WORKFLOW_INDICATOR",
            CONTROL_TYPE_LAYOUT_EDITOR: "CONTROL_TYPE_LAYOUT_EDITOR",
            CONTROL_TYPE_FILE: "CONTROL_TYPE_FILE",
            CONTROL_TYPE_FILTER_CRITERIA: "CONTROL_TYPE_FILTER_CRITERIA"
        },
        ButtonGroupModel,
        CollapsibleGroupModel,
        TableGroupModel,
        ControlCollection;
    require(['buttongroupmodel', 'collapsiblegroupmodel', 'tablegroupmodel'], function (bgm, cgm, tgm) {
        ButtonGroupModel = bgm;
        CollapsibleGroupModel = cgm;
        TableGroupModel = tgm;
    });

    ControlCollection = Backbone.Collection.extend({
        model: function (attrs, options) {

            if (attrs[CM.get(constants.GROUP_TYPE)] !== undefined) {
                if (attrs[CM.get(constants.GROUP_TYPE)] === constants.GROUP_TYPE_TABLE || attrs[CM.get(constants.GROUP_TYPE)] === CM.get(constants.GROUP_TYPE_TABLE) || attrs[constants.GROUP_TYPE] === constants.GROUP_TYPE_TABLE || attrs[constants.GROUP_TYPE] === CM.get(constants.GROUP_TYPE_TABLE)) {
                    return new TableGroupModel(attrs);
                }
                if (attrs[CM.get(constants.GROUP_TYPE)] === constants.GROUP_TYPE_COLLAPSIBLE || attrs[CM.get(constants.GROUP_TYPE)] === CM.get(constants.GROUP_TYPE_COLLAPSIBLE) || attrs[constants.GROUP_TYPE] === constants.GROUP_TYPE_COLLAPSIBLE || attrs[constants.GROUP_TYPE] === CM.get(constants.GROUP_TYPE_COLLAPSIBLE)) {
                    return new CollapsibleGroupModel(attrs);
                }
                if (attrs[CM.get(constants.GROUP_TYPE)] === constants.GROUP_TYPE_BUTTON || attrs[CM.get(constants.GROUP_TYPE)] === CM.get(constants.GROUP_TYPE_BUTTON) || attrs[constants.GROUP_TYPE] === constants.GROUP_TYPE_BUTTON || attrs[constants.GROUP_TYPE] === CM.get(constants.GROUP_TYPE_BUTTON)) {
                    return new ButtonGroupModel(attrs);
                }
                debug.log('Group Dropped Through', attrs);

            } else {
                if (attrs[CM.get(constants.CONTROL_TYPE)] === constants.CONTROL_TYPE_TEXT || attrs[CM.get(constants.CONTROL_TYPE)] === CM.get(constants.CONTROL_TYPE_TEXT) || attrs[constants.CONTROL_TYPE] === constants.CONTROL_TYPE_TEXT || attrs[constants.CONTROL_TYPE] === CM.get(constants.CONTROL_TYPE_TEXT)) {
                    return new TextControlModel(attrs);
                }
                if (attrs[CM.get(constants.CONTROL_TYPE)] === constants.CONTROL_TYPE_SELECT || attrs[CM.get(constants.CONTROL_TYPE)] === CM.get(constants.CONTROL_TYPE_SELECT) || attrs[constants.CONTROL_TYPE] === constants.CONTROL_TYPE_SELECT || attrs[constants.CONTROL_TYPE] === CM.get(constants.CONTROL_TYPE_SELECT)) {
                    return new SelectControlModel(attrs);
                }
                if (attrs[CM.get(constants.CONTROL_TYPE)] === constants.CONTROL_TYPE_BUTTON || attrs[CM.get(constants.CONTROL_TYPE)] === CM.get(constants.CONTROL_TYPE_BUTTON) || attrs[constants.CONTROL_TYPE] === constants.CONTROL_TYPE_BUTTON || attrs[constants.CONTROL_TYPE] === CM.get(constants.CONTROL_TYPE_BUTTON)) {
                    return new ButtonControlModel(attrs);
                }
                if (attrs[CM.get(constants.CONTROL_TYPE)] === constants.CONTROL_TYPE_DATE || attrs[CM.get(constants.CONTROL_TYPE)] === CM.get(constants.CONTROL_TYPE_DATE) || attrs[constants.CONTROL_TYPE] === constants.CONTROL_TYPE_DATE || attrs[constants.CONTROL_TYPE] === CM.get(constants.CONTROL_TYPE_DATE)) {
                    return new DateControlModel(attrs);
                }
                if (attrs[CM.get(constants.CONTROL_TYPE)] === constants.CONTROL_TYPE_GRID || attrs[CM.get(constants.CONTROL_TYPE)] === CM.get(constants.CONTROL_TYPE_GRID) || attrs[constants.CONTROL_TYPE] === constants.CONTROL_TYPE_GRID || attrs[constants.CONTROL_TYPE] === CM.get(constants.CONTROL_TYPE_GRID)) {
                    return new GridControlModel(attrs);
                }
                if (attrs[CM.get(constants.CONTROL_TYPE)] === constants.CONTROL_TYPE_COMPLEX_ITEM_LIST || attrs[CM.get(constants.CONTROL_TYPE)] === CM.get(constants.CONTROL_TYPE_COMPLEX_ITEM_LIST) || attrs[constants.CONTROL_TYPE] === constants.CONTROL_TYPE_COMPLEX_ITEM_LIST || attrs[constants.CONTROL_TYPE] === CM.get(constants.CONTROL_TYPE_COMPLEX_ITEM_LIST)) {
                    return new ComplexListItemControlModel(attrs);
                }
                if (attrs[CM.get(constants.CONTROL_TYPE)] === constants.CONTROL_TYPE_LAYOUT_EDITOR || attrs[CM.get(constants.CONTROL_TYPE)] === CM.get(constants.CONTROL_TYPE_LAYOUT_EDITOR) || attrs[constants.CONTROL_TYPE] === constants.CONTROL_TYPE_LAYOUT_EDITOR || attrs[constants.CONTROL_TYPE] === CM.get(constants.CONTROL_TYPE_LAYOUT_EDITOR)) {
                    return new LayoutEditorControlModel(attrs);
                }
                if (attrs[CM.get(constants.CONTROL_TYPE)] === constants.CONTROL_TYPE_WORKFLOW_INDICATOR || attrs[CM.get(constants.CONTROL_TYPE)] === CM.get(constants.CONTROL_TYPE_WORKFLOW_INDICATOR) || attrs[constants.CONTROL_TYPE] === constants.CONTROL_TYPE_WORKFLOW_INDICATOR || attrs[constants.CONTROL_TYPE] === CM.get(constants.CONTROL_TYPE_WORKFLOW_INDICATOR)) {
                    return new WorkflowIndicatorControlModel(attrs);
                }
                if (attrs[CM.get(constants.CONTROL_TYPE)] === constants.CONTROL_TYPE_FILE || attrs[CM.get(constants.CONTROL_TYPE)] === CM.get(constants.CONTROL_TYPE_FILE) || attrs[constants.CONTROL_TYPE] === constants.CONTROL_TYPE_FILE || attrs[constants.CONTROL_TYPE] === CM.get(constants.CONTROL_TYPE_FILE)) {
                    return new FileControlModel(attrs);
                }
//                if (attrs[CM.get(constants.CONTROL_TYPE)] === constants.CONTROL_TYPE_FILTER_CRITERIA || attrs[CM.get(constants.CONTROL_TYPE)] === CM.get(constants.CONTROL_TYPE_FILTER_CRITERIA) || attrs[constants.CONTROL_TYPE] === constants.CONTROL_TYPE_FILTER_CRITERIA || attrs[constants.CONTROL_TYPE] === CM.get(constants.CONTROL_TYPE_FILTER_CRITERIA)) {
//                    return new FilterCriteriaControlModel(attrs);
//                }

                debug.log('Control Dropped Through', attrs);
            }
            return new Backbone.Model();
        }
    });

    return ControlCollection;
});
