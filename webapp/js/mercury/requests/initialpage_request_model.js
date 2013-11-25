/*global $, define, require*/
/*jslint forin: true */

define(['backbone', 'constantsrequestmodel', 'pageresponsebodymodel', 'baseobjectrequestmodel'], function (Backbone, CM, PageResponseBodyModel, BaseObjectRequestModel) {
    "use strict";
    var C = {
            RESPONSE_BODY: PageResponseBodyModel,
            REQUEST_TYPE_IDENTIFIER : "REQUEST_TYPE_IDENTIFIER",
            REQUEST_TYPE_FULL_DEFINITION: "REQUEST_TYPE_FULL_DEFINITION",
            REQUEST_OBJECT_NAME: "REQUEST_OBJECT_NAME",
            FIELD_PREFIX: "FIELD_PREFIX"
        },
        InitialPageRequestModel = BaseObjectRequestModel.extend({
            C: $.extend({}, C, BaseObjectRequestModel.prototype.C),
            request: function (data, success) {
                var dataobject = {},
                    p;
                dataobject[CM.get(C.REQUEST_TYPE_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_FULL_DEFINITION);
                dataobject[CM.get(C.REQUEST_OBJECT_NAME)] = data.OBJECT_NAME;
                for (p in data.fields) {
                    dataobject[CM.get(C.FIELD_PREFIX) + p] = data.fields[p];
                }

                this.sendRequestWithPersist(dataobject, success);
            }
        });
    return new InitialPageRequestModel();
});
