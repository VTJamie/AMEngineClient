/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'basecontrolview', 'hbs!texttemplate'], function ($, jqM, Backbone, BaseControlView, Template) {"use strict";
    var C = {
        ID : "ID",
        LABEL : "LABEL",
        CURRENT_VALUE : "CURRENT_VALUE",
        MAX_LENGTH : "MAX_LENGTH",
        PROTECTED_TEXT_FIELD : "PROTECTED_TEXT_FIELD",
        TEXT_BOX_TYPE : "TEXT_BOX_TYPE",
        TEXT_BOX_TYPE_TEXT_BOX : "TEXT_BOX_TYPE_TEXT_BOX",
        TEXT_BOX_TYPE_TEXT_AREA : "TEXT_BOX_TYPE_TEXT_AREA",
        EDITABLE : "EDITABLE",
        REQUIRED : "REQUIRED",
        IS_VISIBLE: "IS_VISIBLE"
    }, TextView = BaseControlView.extend({
        initialize : function (options) {
            BaseControlView.prototype.initialize.apply(this, arguments);
            this.template = Template;
        },
        getValue : function () {
            var valueobject = {};
            if (this.model.get(C.IS_VISIBLE) && this.model.get(C.EDITABLE)) {
                if (this.model.get(C.PROTECTED_TEXT_FIELD)) {
                    valueobject[this.model.get(C.ID)] = this.$el.find('[type=password]').val();
                }
                else {
                    if (this.model.get(C.TEXT_BOX_TYPE) === C.TEXT_BOX_TYPE_TEXT_BOX) {
                        valueobject[this.model.get(C.ID)] = this.$el.find(':jqmData(type=text)').val();
                    }
                    else {
                        valueobject[this.model.get(C.ID)] = this.$el.find(':jqmData(type=text)').val();    //temporary
                        //valueobject[this.model.get(C.ID)] = this.$el.find('textarea').val();
                    }
                }
            }
            else {
                valueobject[this.model.get(C.ID)] = this.model.get(C.CURRENT_VALUE);
            }
            return valueobject;
        }
    });
    return TextView;
});
