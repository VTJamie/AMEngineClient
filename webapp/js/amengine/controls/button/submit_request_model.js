/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basefieldrequestmodel', 'submitresponsebodymodel', 'controlviewcollection', 'initialpagerequestmodel'], function (Backbone, CM, BaseFieldRequestModel, SubmitResponseBodyModel, ControlViewCollection, InitialPageRequestModel) {

    "use strict";

    // r-id:d80bf2af-1e72-49fa-a259-67379693a186
    // r-n:Authenticate
    var constants = {
        RESPONSE_BODY: "RESPONSE_BODY",
        ROOT_OBJECT: "ROOT_OBJECT",
        OBJECT_NAME: "OBJECT_NAME",
        ID: "ID"
    }, C = {
        REQUEST_TYPE_IDENTIFIER: "REQUEST_TYPE_IDENTIFIER",
        REQUEST_TYPE_SUB_IDENTIFIER: "REQUEST_TYPE_SUB_IDENTIFIER",
        REQUEST_TYPE_FIELD_REQUEST: "REQUEST_TYPE_FIELD_REQUEST",
        REQUEST_TYPE_FIELD_SUBMIT: "REQUEST_TYPE_FIELD_SUBMIT",
        REQUEST_FIELD_ACTION_PROPERTY_NAME: "REQUEST_FIELD_ACTION_PROPERTY_NAME",
        REQUEST_OBJECT_NAME: "REQUEST_OBJECT_NAME",
        REQUEST_DATA_OBJECT_ID: "REQUEST_DATA_OBJECT_ID",
        RESPONSE_BODY: SubmitResponseBodyModel,
        ROOT_OBJECT: "ROOT_OBJECT",
        OBJECT_NAME: "OBJECT_NAME",
        ID: "ID"
    }, SubmitRequestModel = BaseFieldRequestModel.extend({
        //   url: 'js/amengine/mock/initialpage2.json',
        C: $.extend(C, BaseFieldRequestModel.prototype.C),
        request: function (data, success) {
            var dataobject = {};
            dataobject[CM.get(C.REQUEST_TYPE_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_FIELD_REQUEST);
            dataobject[CM.get(C.REQUEST_TYPE_SUB_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_FIELD_SUBMIT);
            dataobject[CM.get(C.REQUEST_FIELD_ACTION_PROPERTY_NAME)] = data.REQUEST_FIELD_ACTION_PROPERTY_NAME;
            dataobject[CM.get(C.REQUEST_OBJECT_NAME)] = InitialPageRequestModel.get(constants.RESPONSE_BODY).get(constants.OBJECT_NAME);
            dataobject[CM.get(C.REQUEST_DATA_OBJECT_ID)] = InitialPageRequestModel.get(constants.RESPONSE_BODY).get(constants.ID);
            $.extend(dataobject, ControlViewCollection.getFieldValues());
            this.sendRequestWithPersist(dataobject, success);
        }
    });

    return new SubmitRequestModel ();
});
