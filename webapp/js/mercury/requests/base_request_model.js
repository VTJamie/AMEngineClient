/*global $, define, require, alert*/

define(['jquery', 'backbone', 'constantsrequestmodel', 'persistmodel', 'basemodel', 'urlutility'], function ($, Backbone, CM, PersistModel, BaseModel, UrlUtility) {
    "use strict";
    var constants = {
            PERSIST: "PERSIST",
            PERSISTED_PREFIX: "PERSISTED_PREFIX",
            RESPONSE_BODY: "RESPONSE_BODY",
            ERROR: "ERROR",
            SESSION_VALID: "SESSION_VALID"
        },
        C = {
            SESSION_VALID: "SESSION_VALID",
            ERROR: "ERROR"
        },
        BaseRequestModel = BaseModel.extend({
            parse: function (data) {
                PersistModel.set(data[CM.get(constants.PERSIST)]);
                delete data[CM.get(constants.PERSIST)];
                return BaseModel.prototype.parse.apply(this, [data]);
            },
            url: UrlUtility.getBaseURL(),
            C: $.extend({}, C, BaseModel.prototype.C),
            sendRequestWithPersist: function (data, success) {
                this.fetch({
                    data: $.extend(data, PersistModel.getPersist()),
                    success: function (model) {
                        if (!model.get(C.SESSION_VALID) && model.get(C.ERROR) !== undefined) {
                            alert(model.get(C.ERROR));
                        }

                        if (typeof success === "function") {
                            success(model);
                        }
                    },
                    type: "POST"
                });
            }
        });
    return BaseRequestModel;
});
