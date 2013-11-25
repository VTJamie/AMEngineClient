/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'baserequestmodel'], function (Backbone, CM, BaseRequestModel) {
    "use strict";
    var C = {
            REQUEST_TYPE_IDENTIFIER: "REQUEST_TYPE_IDENTIFIER",
            REQUEST_TYPE_LOGOUT: "REQUEST_TYPE_LOGOUT"
        },
        LogoutRequestModel = BaseRequestModel.extend({
            C: $.extend(C, BaseRequestModel.prototype.C),
            request: function (success) {
                var dataobject = {};
                dataobject[CM.get(C.REQUEST_TYPE_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_LOGOUT);
                this.sendRequestWithPersist(dataobject, success);
            }
        });

    return new LogoutRequestModel();
});
