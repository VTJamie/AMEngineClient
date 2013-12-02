/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basemodel'], function (Backbone, CM, BaseModel) {
    "use strict";
    var C = {
            SUBMIT_RESPONSE_ACTION_TYPE_OPEN_DATA_OBJECT_POST_PARAMETER_NAME: "SUBMIT_RESPONSE_ACTION_TYPE_OPEN_DATA_OBJECT_POST_PARAMETER_NAME",
            SUBMIT_RESPONSE_ACTION_TYPE_OPEN_DATA_OBJECT_POST_PARAMETER_VALUE: "SUBMIT_RESPONSE_ACTION_TYPE_OPEN_DATA_OBJECT_POST_PARAMETER_VALUE"
        },
        PostValueModel = BaseModel.extend({
            C: $.extend({}, C, BaseModel.prototype.C)
        });

    return PostValueModel;
});
