/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basecontrolmodel'], function (Backbone, CM, BaseControlModel) {
    "use strict";
    var constants = {
            CONTROL_TYPE_WORKFLOW_INDICATOR: "CONTROL_TYPE_WORKFLOW_INDICATOR"
        },
        C = {
            CONTROL_TYPE: function (value) {
                return constants.CONTROL_TYPE_WORKFLOW_INDICATOR;
            }
        },
        WorkflowIndicatorControlModel = BaseControlModel.extend({
            C: $.extend({}, C, BaseControlModel.prototype.C)
        });

    return WorkflowIndicatorControlModel;
});
