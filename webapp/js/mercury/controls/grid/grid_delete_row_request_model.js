/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basefieldrequestmodel', 'submitresponsebodymodel', 'controlviewcollection', 'initialpagerequestmodel', 'pageresponsebodymodel'], function (Backbone, CM, BaseFieldRequestModel, SubmitResponseBodyModel, ControlViewCollection, InitialPageRequestModel, PageResponseBodyModel) {
    "use strict";
    var constants = {
            RESPONSE_BODY: "RESPONSE_BODY",
            OBJECT_NAME: "OBJECT_NAME",
            ID: "ID"
        },
        C = {
            RESPONSE_BODY: "RESPONSE_BODY",
            REQUEST_TYPE_IDENTIFIER: "REQUEST_TYPE_IDENTIFIER",
            REQUEST_TYPE_SUB_IDENTIFIER: "REQUEST_TYPE_SUB_IDENTIFIER",
            REQUEST_TYPE_FIELD_REQUEST: "REQUEST_TYPE_FIELD_REQUEST",
            REQUEST_OBJECT_NAME: "REQUEST_OBJECT_NAME",
            REQUEST_DATA_OBJECT_ID: "REQUEST_DATA_OBJECT_ID",
            REQUEST_FIELD_ACTION_PROPERTY_NAME: "REQUEST_FIELD_ACTION_PROPERTY_NAME",
            REQUEST_GRID_VIEW_ITEM_ID: "REQUEST_GRID_VIEW_ITEM_ID",
            REQUEST_TYPE_GRID_DELETE: "REQUEST_TYPE_GRID_DELETE"
        },
        GridDeleteRowRequestModel = BaseFieldRequestModel.extend({
            C: $.extend({}, C, BaseFieldRequestModel.prototype.C),
            request: function (data, success) {
                var dataobject = {},
                    currentpageresponsebody = PageResponseBodyModel.getCurrentInstance();
                $('.ui-page-active .error').empty();

                dataobject[CM.get(C.REQUEST_TYPE_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_FIELD_REQUEST);
                dataobject[CM.get(C.REQUEST_TYPE_SUB_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_GRID_DELETE);
                dataobject[CM.get(C.REQUEST_FIELD_ACTION_PROPERTY_NAME)] = data.REQUEST_FIELD_ACTION_PROPERTY_NAME;
                dataobject[CM.get(C.REQUEST_GRID_VIEW_ITEM_ID)] = data.REQUEST_GRID_VIEW_ITEM_ID;
                dataobject[CM.get(C.REQUEST_OBJECT_NAME)] = currentpageresponsebody.get(constants.RESPONSE_BODY).get(constants.OBJECT_NAME);
                dataobject[CM.get(C.REQUEST_DATA_OBJECT_ID)] = currentpageresponsebody.get(constants.RESPONSE_BODY).get(constants.ID);
                $.extend(dataobject, ControlViewCollection.getFieldValues());
                this.sendRequestWithPersist(dataobject, success);
            }
        });

    return new GridDeleteRowRequestModel();
});
