/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'basecontrolview', 'hbs!selecttemplate'], function (
    $, jqM, Backbone, BaseControlView, Template) {
    "use strict";
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
        REQUIRED: "REQUIRED"
    },
        SelectView = BaseControlView.extend({
            initialize: function (options) {
                BaseControlView.prototype.initialize.apply(this, arguments);
                this.template = Template;
            },
            getValue: function (){
                var returnvalue = {};
                if(this.model.get(C.EDITABLE)){
                    returnvalue[this.model.get(C.ID)] = this.$el.find('select').val();
                }
                return returnvalue;
            }            
        });
    return SelectView;
});
