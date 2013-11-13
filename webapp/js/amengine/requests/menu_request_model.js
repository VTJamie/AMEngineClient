/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'baserequestmodel', 'menumodel'], function (Backbone, CM, BaseRequestModel, MenuModel) {
    "use strict";
    var C = {
            MENU: MenuModel,
            REQUEST_TYPE_IDENTIFIER: "REQUEST_TYPE_IDENTIFIER",
            REQUEST_TYPE_MENU: "REQUEST_TYPE_MENU"
        },
        MenuRequestModel = BaseRequestModel.extend({
            C: $.extend(C, BaseRequestModel.prototype.C),
            request: function (success) {
                var dataobject = {};
                dataobject[CM.get(C.REQUEST_TYPE_IDENTIFIER)] = CM.get(C.REQUEST_TYPE_MENU);
                this.sendRequestWithPersist(dataobject, success);
            }
        //    url: 'js/amengine/mock/menu.json'
        });

    return new MenuRequestModel();
});
