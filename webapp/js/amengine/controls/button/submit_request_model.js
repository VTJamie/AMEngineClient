/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basefieldrequestmodel', 'submitresponsebodymodel', 'controlviewcollection', 'initialpagerequestmodel', 'pageresponsebodymodel'], function (Backbone, CM, BaseFieldRequestModel, SubmitResponseBodyModel, ControlViewCollection, InitialPageRequestModel, PageResponseBodyModel) {

    "use strict";

    // r-id:d80bf2af-1e72-49fa-a259-67379693a186
    // r-n:Authenticate
    var constants = {
        RESPONSE_BODY: "RESPONSE_BODY",
        ROOT_OBJECT: "ROOT_OBJECT",
        OBJECT_NAME: "OBJECT_NAME",
        ID: "ID",
        ERRORS: "ERRORS",
        ERROR_FIELD: "ERROR_FIELD"
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
            var dataobject = {},
            currentpageresponsebody = PageResponseBodyModel.getCurrentInstance();
            dataobject[CM.get(C.REQUEST_TYPE_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_FIELD_REQUEST);
            dataobject[CM.get(C.REQUEST_TYPE_SUB_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_FIELD_SUBMIT);
            dataobject[CM.get(C.REQUEST_FIELD_ACTION_PROPERTY_NAME)] = data.REQUEST_FIELD_ACTION_PROPERTY_NAME;
            dataobject[CM.get(C.REQUEST_OBJECT_NAME)] = currentpageresponsebody.get(constants.RESPONSE_BODY).get(constants.OBJECT_NAME);
            dataobject[CM.get(C.REQUEST_DATA_OBJECT_ID)] = currentpageresponsebody.get(constants.RESPONSE_BODY).get(constants.ID);
            $.extend(dataobject, ControlViewCollection.getFieldValues());
            this.sendRequestWithPersist(dataobject, function(model) {
                debug.log(JSON.stringify(model.get(constants.RESPONSE_BODY).toJSON()));
                if(model.get(constants.RESPONSE_BODY).get(constants.ERRORS).length > 0) {
                    model.get(constants.RESPONSE_BODY).get(constants.ERRORS).each(function (curerror) {
                        debug.log(ControlViewCollection.getFieldView(curerror.get(constants.ERROR_FIELD)).toJSON());
                    });
                } else {
                    success(model);
                }



            });
        }
    });

    return new SubmitRequestModel ();
});
