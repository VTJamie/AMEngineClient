/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basefieldrequestmodel', 'initialpagerequestmodel', 'dialogresponsebodymodel'], function (Backbone, CM, BaseFieldRequestModel, InitialPageRequestModel, DialogResponseBodyModel) {

    "use strict";

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
        REQUEST_COMPLEX_ITEM_ID: "REQUEST_COMPLEX_ITEM_ID",
        REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_SUBMIT: "REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_SUBMIT",
        RESPONSE_BODY: DialogResponseBodyModel,
        ROOT_OBJECT: "ROOT_OBJECT",
        OBJECT_NAME: "OBJECT_NAME",
        REQUEST_MAIN_OBJECT_ID: "REQUEST_MAIN_OBJECT_ID",
        REQUEST_MAIN_OBJECT_FIELD_NAME: "REQUEST_MAIN_OBJECT_FIELD_NAME",
        ID: "ID"
    }, ComplexListItemEditRequestModel = BaseFieldRequestModel.extend({
        //   url: 'js/amengine/mock/initialpage2.json',
        C: $.extend(C, BaseFieldRequestModel.prototype.C),
        request: function (data, success) {
            var dataobject = {},
            responsebody = InitialPageRequestModel.get(constants.RESPONSE_BODY);

            dataobject[CM.get(C.REQUEST_TYPE_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_FIELD_REQUEST);  //            r-1:F
            dataobject[CM.get(C.REQUEST_TYPE_SUB_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_SUBMIT); //r-2:CIS
            dataobject[CM.get(C.REQUEST_FIELD_ACTION_PROPERTY_NAME)] = data.REQUEST_FIELD_ACTION_PROPERTY_NAME;   //            r-fn:FieldList
            dataobject[CM.get(C.REQUEST_MAIN_OBJECT_ID)] = data.REQUEST_MAIN_OBJECT_ID; //        r-mid:d9ad69aa-6f74-4468-9de9-32dc5bbbbff5
            dataobject[CM.get(C.REQUEST_MAIN_OBJECT_FIELD_NAME)] = data.REQUEST_MAIN_OBJECT_FIELD_NAME;//        r-mfn:FieldList
            //dataobject[CM.get(C.REQUEST_COMPLEX_ITEM_ID)] = data.REQUEST_COMPLEX_ITEM_ID;
           // dataobject[CM.get(C.REQUEST_OBJECT_NAME)] = responsebody.get(constants.OBJECT_NAME); //            r-n:FormDefinitionEdit
           // dataobject[CM.get(C.REQUEST_DATA_OBJECT_ID)] = responsebody.get(constants.ID); //            r-id:5234bb7b-0550-448b-8cac-262cec479796
            $.extend(dataobject, ControlViewCollection.getFieldValues());
            this.sendRequestWithPersist(dataobject, success);  //            p-usid:80af3d83-5402-4b05-9ae6-f3a6e9f3b241
        }
    });

    return new ComplexListItemEditRequestModel ();
});
