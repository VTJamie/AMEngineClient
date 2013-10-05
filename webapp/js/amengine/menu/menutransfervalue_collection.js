/*global $, define, require*/

define(['backbone', 'menutransfervaluemodel'], function (Backbone,
    MenuTransferValueModel) {

    var MenuTransferValueCollection = Backbone.Collection.extend({
        model: MenuTransferValueModel
    });

    return MenuTransferValueCollection;
});
