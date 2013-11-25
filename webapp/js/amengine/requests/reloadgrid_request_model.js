/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'pageresponsebodymodel', 'baseobjectrequestmodel', 'controlviewcollection', 'refreshresponsebodymodel', 'griddetailsmodel'], function (Backbone, CM, PageResponseBodyModel, BaseObjectRequestModel, ControlViewCollection, RefreshResponseBodyModel, GridDetailsModel) {
    "use strict";
    var constants = {
            RESPONSE_BODY: "RESPONSE_BODY"
        },
        C = {
            REQUEST_TYPE_IDENTIFIER: "REQUEST_TYPE_IDENTIFIER",
            REQUEST_TYPE_SUB_IDENTIFIER: "REQUEST_TYPE_SUB_IDENTIFIER",
            REQUEST_TYPE_GRID_RELOAD: "REQUEST_TYPE_GRID_RELOAD",
            REQUEST_TYPE_FIELD_REQUEST: "REQUEST_TYPE_FIELD_REQUEST",
            GRID_VIEW_RELOAD_REQUEST_PAGE: "GRID_VIEW_RELOAD_REQUEST_PAGE",
            GRID_VIEW_RELOAD_REQUEST_ROWS: "GRID_VIEW_RELOAD_REQUEST_ROWS",
            GRID_VIEW_RELOAD_REQUEST_SORT_NAME: "GRID_VIEW_RELOAD_REQUEST_SORT_NAME",
            GRID_VIEW_RELOAD_REQUEST_SORT_ORDER: "GRID_VIEW_RELOAD_REQUEST_SORT_ORDER",
            OBJECT_NAME: "OBJECT_NAME",
            ID: "ID",
            REQUEST_OBJECT_NAME: "REQUEST_OBJECT_NAME",
            REQUEST_DATA_OBJECT_ID: "REQUEST_DATA_OBJECT_ID",
            REQUEST_FIELD_ACTION_PROPERTY_NAME: "REQUEST_FIELD_ACTION_PROPERTY_NAME",
            RESPONSE_BODY: GridDetailsModel
        },
        ReloadGridRequestModel = BaseObjectRequestModel.extend({
            C: $.extend({}, C, BaseObjectRequestModel.prototype.C),
            request: function (data, success, options) {
                var dataobject = {},
                    currentpageresponsebody = PageResponseBodyModel.getCurrentInstance();
                dataobject[CM.get(C.REQUEST_TYPE_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_FIELD_REQUEST);
                dataobject[CM.get(C.REQUEST_TYPE_SUB_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_GRID_RELOAD);

                dataobject[CM.get(C.GRID_VIEW_RELOAD_REQUEST_PAGE)] = data.GRID_VIEW_RELOAD_REQUEST_PAGE;
                dataobject[CM.get(C.GRID_VIEW_RELOAD_REQUEST_ROWS)] = data.GRID_VIEW_RELOAD_REQUEST_ROWS;
                dataobject[CM.get(C.GRID_VIEW_RELOAD_REQUEST_SORT_NAME)] = data.GRID_VIEW_RELOAD_REQUEST_SORT_NAME;
                dataobject[CM.get(C.GRID_VIEW_RELOAD_REQUEST_SORT_ORDER)] = data.GRID_VIEW_RELOAD_REQUEST_SORT_ORDER;

                dataobject[CM.get(C.REQUEST_FIELD_ACTION_PROPERTY_NAME)] = data.REQUEST_FIELD_ACTION_PROPERTY_NAME;

                dataobject[CM.get(C.REQUEST_OBJECT_NAME)] = currentpageresponsebody.get(constants.RESPONSE_BODY).get(C.OBJECT_NAME);
                dataobject[CM.get(C.REQUEST_DATA_OBJECT_ID)] = currentpageresponsebody.get(constants.RESPONSE_BODY).get(C.ID);

                this.sendRequestWithPersist(dataobject, function (refreshmodel) {
                    success(refreshmodel);
                });
            }
        });
    return new ReloadGridRequestModel();
});
