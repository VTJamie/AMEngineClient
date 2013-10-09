/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basemodel'], function (Backbone, CM, BaseModel) {
    "use strict";
    var constants = {
        SUBMIT_RESPONSE_ACTION_TYPE_CLOSE: "SUBMIT_RESPONSE_ACTION_TYPE_CLOSE"
    },
    C = {
         SUBMIT_RESPONSE_ACTION_TYPE: function(value){
             if(value === CM.get(constants.SUBMIT_RESPONSE_ACTION_TYPE_CLOSE)){
                 return constants.SUBMIT_RESPONSE_ACTION_TYPE_CLOSE;
             }
         }
    }, SubmitActionModel = BaseModel.extend({
        C: $.extend(C, BaseModel.prototype.C)
    });

    return SubmitActionModel;
});
