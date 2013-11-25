/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'basecontrolview', 'hbs!texttemplate'], function ($, jqM, Backbone, BaseControlView, Template) {
    "use strict";
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
        },
        TextView = BaseControlView.extend({
            initialize : function (options) {
                BaseControlView.prototype.initialize.apply(this, arguments);
                this.template = Template;
            },
            getValue : function () {
                var valueobject = {};
                if (this.model.get(C.IS_VISIBLE) && this.model.get(C.EDITABLE)) {
                    if (this.model.get(C.PROTECTED_TEXT_FIELD)) {
                        valueobject[this.model.get(C.ID)] = this.$el.find('[type=password]').val().trim();
                    } else {
                        if (this.model.get(C.TEXT_BOX_TYPE) === C.TEXT_BOX_TYPE_TEXT_BOX) {
                            valueobject[this.model.get(C.ID)] = this.$el.find(':jqmData(type=text)').val().trim();
                        } else {
                            valueobject[this.model.get(C.ID)] = this.$el.find('textarea').val().trim();
                        }
                    }
                } else {
                    valueobject[this.model.get(C.ID)] = this.model.get(C.CURRENT_VALUE).trim();
                }
                return valueobject;
            },
            events: $.extend({}, {
                'keyup': 'stopKeyUpDefault',
                'keydown': 'stopKeyDownDefault'
            }, BaseControlView.prototype.events),
            stopKeyDownDefault: function (e) {
                if (this.model.get(C.TEXT_BOX_TYPE) === C.TEXT_BOX_TYPE_TEXT_AREA && e.keyCode === 9) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            },
            stopKeyUpDefault: function (e) {
                var returnvalue, start, end, $this, value;
                if (this.model.get(C.TEXT_BOX_TYPE) === C.TEXT_BOX_TYPE_TEXT_AREA) {
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        e.stopPropagation();

                        returnvalue = false;
                    } else if (e.keyCode === 9) {
                        start = e.target.selectionStart;
                        end = e.target.selectionEnd;
                        $this = $(e.target);
                        value = $this.val();

                        // set textarea value to: text before caret + tab + text after caret
                        $this.val([
                            value.substring(0, start),
                            "    ",
                            value.substring(end)].join(""));

                        // put caret at right position again (add one for the tab)
                        e.target.selectionStart = e.target.selectionEnd = start + 4;
                        e.preventDefault();
                        e.stopPropagation();

                        returnvalue = false;
                    }
                }
                return returnvalue;
            }
        });
    return TextView;
});
