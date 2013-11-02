/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'basecontrolview', 'hbs!datetemplate'], function (
    $, jqM, Backbone, BaseControlView, Template) {

    var C = {
        ID: "ID",
        LABEL: "LABEL",
        CURRENT_VALUE: "CURRENT_VALUE",
        MAX_LENGTH: "MAX_LENGTH",
        PROTECTED_TEXT_FIELD: "PROTECTED_TEXT_FIELD",
        TEXT_BOX_TYPE: "TEXT_BOX_TYPE",
        TEXT_BOX_TYPE_TEXT_BOX: "TEXT_BOX_TYPE_TEXT_BOX",
        TEXT_BOX_TYPE_TEXT_AREA: "TEXT_BOX_TYPE_TEXT_AREA",
        EDITABLE: "EDITABLE",
        REQUIRED: "REQUIRED",
        IS_VISIBLE: "IS_VISIBLE"
    };

    var DateView = BaseControlView.extend({
            initialize: function (options) {
                BaseControlView.prototype.initialize.apply(this, arguments);
                this.template = Template;
            },
            getValue : function () {

                var valueobj = {};
                if (this.model.get(C.IS_VISIBLE) && this.model.get(C.EDITABLE)) {
                    valueobj[this.model.get(C.ID)] = this.$el.find(':jqmData(type=date)').val().trim();
                }
                else if (this.model.get(C.IS_VISIBLE)) {
                    valueobj[this.model.get(C.ID)] = this.model.get(C.CURRENT_VALUE).trim();
                }

                return valueobj;
            }
    });
    return DateView;
});
