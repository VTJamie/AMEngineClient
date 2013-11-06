/*global $, define, require*/

define(['jquery', 'backbone', 'constantsrequestmodel', 'persistmodel', 'basemodel', 'urlutility'], function ($, Backbone, CM, PersistModel, BaseModel, UrlUtility) {
    "use strict";
    var constants = {
        PERSIST: "PERSIST",
        PERSISTED_PREFIX: "PERSISTED_PREFIX",
    },
        C = {
            SESSION_VALID: "SESSION_VALID"
        }, BaseRequestModel = BaseModel.extend({
            parse: function (data) {
                PersistModel.set(data[CM.get(constants.PERSIST)]);
                delete data[CM.get(constants.PERSIST)];
                return BaseModel.prototype.parse.apply(this, [data]);
            },
            url: UrlUtility.getBaseURL(),
            C: $.extend(C, BaseModel.prototype.C),
            sendRequestWithPersist: function (data, success) {
                this.fetch({
                    data: $.extend(data, PersistModel.getPersist()),
                    success: success,
                    type: "POST"
                });
            }
        });

    return BaseRequestModel;
});
