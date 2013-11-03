/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'pageresponsebodymodel', 'baseobjectrequestmodel', 'controlviewcollection', 'refreshresponsebodymodel'], function (Backbone, CM, PageResponseBodyModel, BaseObjectRequestModel, ControlViewCollection, RefreshResponseBodyModel) {
    "use strict";
    var constants = {
        RESPONSE_BODY: "RESPONSE_BODY",
        CONTROL_ARRAY: "CONTROL_ARRAY"
    }, C = {
            REQUEST_TYPE_IDENTIFIER : "REQUEST_TYPE_IDENTIFIER",
            REQUEST_OBJECT_NAME: "REQUEST_OBJECT_NAME",
            FIELD_PREFIX: "FIELD_PREFIX",
            RESPONSE_BODY: RefreshResponseBodyModel,
            OBJECT_NAME: "OBJECT_NAME",
            REQUEST_TYPE_REFRESH_CONTROLS: "REQUEST_TYPE_REFRESH_CONTROLS",
            ID: "ID",
            REQUEST_DATA_OBJECT_ID: "REQUEST_DATA_OBJECT_ID"
        }, 
        RefreshControlsRequestModel = BaseObjectRequestModel.extend({
            C: $.extend({}, C, BaseObjectRequestModel.prototype.C),
            request: function (data, success) {
                var dataobject = {},
                    currentpageresponsebody = PageResponseBodyModel.getCurrentInstance();
                dataobject[CM.get(C.REQUEST_TYPE_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_REFRESH_CONTROLS);
                dataobject[CM.get(C.REQUEST_OBJECT_NAME)] = currentpageresponsebody.get(constants.RESPONSE_BODY).get(C.OBJECT_NAME);
                dataobject[CM.get(C.REQUEST_DATA_OBJECT_ID)] = currentpageresponsebody.get(constants.RESPONSE_BODY).get(C.ID);
                dataobject = $.extend({}, dataobject, ControlViewCollection.getRefreshFields());

                this.sendRequestWithPersist(dataobject, function(refreshmodel) {
                    success(refreshmodel);
                    ControlViewCollection.reloadControls(refreshmodel.get(constants.RESPONSE_BODY).get(constants.CONTROL_ARRAY))
                });
            }
        });                
    
    return new RefreshControlsRequestModel();
});
