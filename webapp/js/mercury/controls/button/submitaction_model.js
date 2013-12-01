/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basemodel', 'postvaluecollection'], function (Backbone, CM, BaseModel, PostValueCollection) {
    "use strict";
    var constants = {
            SUBMIT_RESPONSE_ACTION_TYPE_CLOSE: "SUBMIT_RESPONSE_ACTION_TYPE_CLOSE",
            SUBMIT_RESPONSE_ACTION_TYPE_OPEN_DATA_OBJECT: "SUBMIT_RESPONSE_ACTION_TYPE_OPEN_DATA_OBJECT"
        },
        C = {
            SUBMIT_RESPONSE_ACTION_TYPE_OPEN_DATA_OBJECT_POST_VALUES: PostValueCollection,
            SUBMIT_RESPONSE_ACTION_TYPE_OPEN_DATA_OBJECT_OBJECT_NAME: "SUBMIT_RESPONSE_ACTION_TYPE_OPEN_DATA_OBJECT_OBJECT_NAME",
            SUBMIT_RESPONSE_ACTION_TYPE: function (value) {
                if (value === CM.get(constants.SUBMIT_RESPONSE_ACTION_TYPE_CLOSE)) {
                    return constants.SUBMIT_RESPONSE_ACTION_TYPE_CLOSE;
                } else if (value === CM.get(constants.SUBMIT_RESPONSE_ACTION_TYPE_OPEN_DATA_OBJECT)) {
                    return constants.SUBMIT_RESPONSE_ACTION_TYPE_OPEN_DATA_OBJECT;
                }
            }
        },
        SubmitActionModel = BaseModel.extend({
            C: $.extend({}, C, BaseModel.prototype.C)
        });

    return SubmitActionModel;
});
