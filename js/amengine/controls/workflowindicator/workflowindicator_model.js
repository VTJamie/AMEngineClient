/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basecontrolmodel'], function (
    Backbone, CM, BaseControlModel) {

    var constants = {
        CONTROL_TYPE_WORKFLOW_INDICATOR: "CONTROL_TYPE_WORKFLOW_INDICATOR"
    };
    var C = {
        CONTROL_TYPE: function (value) {
            return constants.CONTROL_TYPE_WORKFLOW_INDICATOR;
        },
    };

    var WorkflowIndicatorControlModel = BaseControlModel.extend({
        C: $.extend(C, BaseControlModel.prototype.C)
    });

    return WorkflowIndicatorControlModel;
});
