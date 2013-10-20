/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basefieldrequestmodel', 'pageresponsebodymodel', 'dialogresponsebodymodel', 'controlviewcollection', 'complexitemlistsubmitresponsebodymodel'], function (Backbone, CM, BaseFieldRequestModel, PageResponseBodyModel, DialogResponseBodyModel, ControlViewCollection, ComplexItemListSubmitResponseBodyModel) {

    "use strict";

    var constants = {
        RESPONSE_BODY: "RESPONSE_BODY",
        ROOT_OBJECT: "ROOT_OBJECT",
        OBJECT_NAME: "OBJECT_NAME",
        MAIN_REQUEST_OBJECT_ID: "MAIN_REQUEST_OBJECT_ID",
        MAIN_REQUEST_FIELD_NAME: "MAIN_REQUEST_FIELD_NAME",
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
        REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_SAVE_ITEM: "REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_SAVE_ITEM",
        RESPONSE_BODY: ComplexItemListSubmitResponseBodyModel,
        ROOT_OBJECT: "ROOT_OBJECT",
        OBJECT_NAME: "OBJECT_NAME",
        REQUEST_MAIN_OBJECT_ID: "REQUEST_MAIN_OBJECT_ID",
        REQUEST_MAIN_OBJECT_FIELD_NAME: "REQUEST_MAIN_OBJECT_FIELD_NAME",
        ID: "ID"
    }, ComplexListItemEditRequestModel = BaseFieldRequestModel.extend({

//        r-1:F
//        r-fn:Submit
//        r-id:945745b8-0c16-4059-8e57-378e4d32c5f3
//        r-n:FormDefinitionEdit
//        r-2:CIS
//        r-mfn:FieldList
//        r-mid:a4293ba5-4ea1-41e2-8cab-592700d904a6
//
//        r-1:F
//        r-2:CIS
//        r-fn:Submit
//        r-mfn:FieldList
//        r-n:FormDefinitionEdit
//        r-id:d2f5d1f6-612e-4b3f-a952-990ba0c0a5ab
        C: $.extend(C, BaseFieldRequestModel.prototype.C),
        request: function (data, success) {
            var dataobject = {},
            responsebody = PageResponseBodyModel.getCurrentInstance().get(constants.RESPONSE_BODY);
            dataobject[CM.get(C.REQUEST_TYPE_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_FIELD_REQUEST);  //            r-1:F
            dataobject[CM.get(C.REQUEST_TYPE_SUB_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_SAVE_ITEM); //r-2:CIS
            dataobject[CM.get(C.REQUEST_FIELD_ACTION_PROPERTY_NAME)] = data.REQUEST_FIELD_ACTION_PROPERTY_NAME;   //            r-fn:FieldList
            dataobject[CM.get(C.REQUEST_MAIN_OBJECT_ID)] = responsebody.get(constants.MAIN_REQUEST_OBJECT_ID); //        r-mid:d9ad69aa-6f74-4468-9de9-32dc5bbbbff5
            dataobject[CM.get(C.REQUEST_MAIN_OBJECT_FIELD_NAME)] = responsebody.get(constants.MAIN_REQUEST_FIELD_NAME);//        r-mfn:FieldList
            dataobject[CM.get(C.REQUEST_OBJECT_NAME)] = responsebody.get(constants.OBJECT_NAME); //            r-n:FormDefinitionEdit
            dataobject[CM.get(C.REQUEST_DATA_OBJECT_ID)] = responsebody.get(constants.ID); //            r-id:5234bb7b-0550-448b-8cac-262cec479796
            $.extend(dataobject, ControlViewCollection.getFieldValues());
            this.sendRequestWithPersist(dataobject, success);  //            p-usid:80af3d83-5402-4b05-9ae6-f3a6e9f3b241
        }
    });

    return new ComplexListItemEditRequestModel ();
});
