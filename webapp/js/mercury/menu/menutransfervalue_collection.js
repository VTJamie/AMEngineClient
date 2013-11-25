/*global $, define, require*/

define(['backbone', 'menutransfervaluemodel'], function (Backbone,
    MenuTransferValueModel) {
    "use strict";
    var MenuTransferValueCollection = Backbone.Collection.extend({
            model: MenuTransferValueModel
        });

    return MenuTransferValueCollection;
});
