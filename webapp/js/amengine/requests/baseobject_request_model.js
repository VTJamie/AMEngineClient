/*global $, define, require*/

define(['jquery', 'backbone', 'constantsrequestmodel', 'baserequestmodel'], function (
    $, Backbone, CM, BaseRequestModel) {

    var C = {
        RESPONSE_TYPE_IDENTIFIER: "RESPONSE_TYPE_IDENTIFIER"
        //    PERSIST: "PERSIST"
    };

    //M[C.PERSIST] = PersistModel;

    var BaseObjectRequestModel = BaseRequestModel.extend({
        C: $.extend(C, BaseRequestModel.prototype.C)
    });

    return BaseObjectRequestModel;
});
