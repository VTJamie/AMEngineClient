/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'initialpagerequestmodel', 'baserequestmodel', 'landingpagerequestmodel'], function (Backbone, CM, InitialPageRequestModel, BaseRequestModel, LandingPageRequestModel) {"use strict";
    var C = {
        REQUEST_TYPE_IDENTIFIER : "REQUEST_TYPE_IDENTIFIER",
        REQUEST_TYPE_LANDING_NAME : "REQUEST_TYPE_LANDING_NAME",
        OBJECT_NAME : "OBJECT_NAME"
    }, LandingPageModel = BaseRequestModel.extend({
        //  url: 'js/amengine/mock/landingpage.json'
        C : $.extend(C, BaseRequestModel.prototype.C),
        request : function (success) {
            var dataobject = {};
            dataobject[CM.get(C.REQUEST_TYPE_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_LANDING_NAME);
            this.sendRequestWithPersist(dataobject, function (model) {
                InitialPageRequestModel.request({
                    OBJECT_NAME : model.get(C.OBJECT_NAME)
                }, success);
            });

        }
    });

    return new LandingPageModel ();
});
