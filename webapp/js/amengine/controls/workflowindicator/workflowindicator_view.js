/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'basecontrolview', 'hbs!workflowindicatortemplate'], function (
    $, jqM, Backbone, BaseControlView, Template) {

    var C = {
        LABEL: "LABEL",
        CURRENT_VALUE: "CURRENT_VALUE",
        MAX_LENGTH: "MAX_LENGTH",
        PROTECTED_TEXT_FIELD: "PROTECTED_TEXT_FIELD",
        TEXT_BOX_TYPE: "TEXT_BOX_TYPE",
        TEXT_BOX_TYPE_TEXT_BOX: "TEXT_BOX_TYPE_TEXT_BOX",
        TEXT_BOX_TYPE_TEXT_AREA: "TEXT_BOX_TYPE_TEXT_AREA",
        EDITABLE: "EDITABLE",
        REQUIRED: "REQUIRED"
    };

    var WorkflowIndicatorView = BaseControlView.extend({
            initialize: function (options) {
                BaseControlView.prototype.initialize.apply(this, arguments);
                this.template = Template;
            },
            getValue : function () {
                return BaseControlView.prototype.getValue.apply(this, arguments);
            }
    });
    return WorkflowIndicatorView;
});
