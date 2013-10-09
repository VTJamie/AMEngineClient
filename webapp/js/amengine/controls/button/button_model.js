/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basecontrolmodel'], function (Backbone, CM, BaseControlModel) {
    "use strict";
    var constants = {
        CONTROL_TYPE_BUTTON : "CONTROL_TYPE_BUTTON",
        BUTTON_TYPE_SUBMIT : "BUTTON_TYPE_SUBMIT",
        BUTTON_TYPE_CANCEL : "BUTTON_TYPE_CANCEL"
    }, C = {
        BUTTON_TYPE: function (value){
            if(CM.get(constants.BUTTON_TYPE_SUBMIT) === value){
                return constants.BUTTON_TYPE_SUBMIT;
            }
             else if(CM.get(constants.BUTTON_TYPE_CANCEL) === value){
                 return constants.BUTTON_TYPE_CANCEL;
            }
            else{
                return undefined;
            }
        },
        BUTTON_ALLOW_RETURN_CLICK : "BUTTON_ALLOW_RETURN_CLICK",
        CONTROL_TYPE : function (value) {
            return constants.CONTROL_TYPE_BUTTON;
        }
    }, ButtonControlModel = BaseControlModel.extend({
        C : $.extend(C, BaseControlModel.prototype.C)
    });

    return ButtonControlModel;
});
