/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basefieldrequestmodel', 'initialpagerequestmodel', 'dialogresponsebodymodel', 'pageresponsebodymodel'], function (Backbone, CM, BaseFieldRequestModel, InitialPageRequestModel, DialogResponseBodyModel, PageResponseBodyModel) {

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
        REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_NEW_ITEM: "REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_NEW_ITEM",
        RESPONSE_BODY: DialogResponseBodyModel,
        ROOT_OBJECT: "ROOT_OBJECT",
        OBJECT_NAME: "OBJECT_NAME",
        ID: "ID"
    }, ComplexListItemNewRequestModel = BaseFieldRequestModel.extend({
        //   url: 'js/amengine/mock/initialpage2.json',
        C: $.extend(C, BaseFieldRequestModel.prototype.C),
        request: function (data, success) {
      //  r-1:F
        //        r-2:CIN
        //        r-id:83301043-7963-48b2-ab70-170999219b05
        //        r-n:FormDefinitionEdit
        //        r-fn:Privileges
        //        p-usid:8e6d1e07-c4b7-42a2-a486-ea4bdbdc77a9
            var dataobject = {},
            responsebody = PageResponseBodyModel.getCurrentInstance().get(constants.RESPONSE_BODY);

            dataobject[CM.get(C.REQUEST_TYPE_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_FIELD_REQUEST);  //            r-1:F
            dataobject[CM.get(C.REQUEST_TYPE_SUB_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_FIELD_COMPLEX_ITEM_LIST_NEW_ITEM); //            r-2:CIE
            dataobject[CM.get(C.REQUEST_FIELD_ACTION_PROPERTY_NAME)] = data.REQUEST_FIELD_ACTION_PROPERTY_NAME;   //            r-fn:FieldList
            dataobject[CM.get(C.REQUEST_OBJECT_NAME)] = responsebody.get(constants.OBJECT_NAME); //            r-n:FormDefinitionEdit
            dataobject[CM.get(C.REQUEST_DATA_OBJECT_ID)] = responsebody.get(constants.ID); //            r-id:5234bb7b-0550-448b-8cac-262cec479796
            this.sendRequestWithPersist(dataobject, success);  //            p-usid:80af3d83-5402-4b05-9ae6-f3a6e9f3b241
        }
    });

    return new ComplexListItemNewRequestModel ();
});
