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
                PersistModel.set(CM.get(constants.PERSIST));
                delete data[CM.get(constants.PERSIST)];
                return BaseModel.prototype.parse.apply(this, [data]);
            },
            url: UrlUtility.getBaseURL(),
            C: $.extend(C, BaseModel.prototype.C),
            sendRequestWithPersist: function (data, success) {
                this.fetch({
                	data: $.extend(data, this.getPersist()),
                    success: success,
                    type: "POST"
                });
            },
            getPersist: function () {            	
                return this.prependStringToJSON(CM.get(constants.PERSISTED_PREFIX), PersistModel.toJSON());
            },
            prependStringToJSON: function (prefix, jsonobject) {
                var returnjsonobject = {};
                for (var p in jsonobject) {
                    returnjsonobject[prefix + p] = jsonobject[p];
                }
                return returnjsonobject;
            }
        });

    return BaseRequestModel;
});
