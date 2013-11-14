/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basecontrolmodel'], function (Backbone, CM, BaseControlModel) {
    "use strict";
    var C = {
            SELECT_ITEM_VALUE: "SELECT_ITEM_VALUE",
            SELECT_ITEM_LABEL: "SELECT_ITEM_LABEL",
            SELECT_ITEM_IS_SELECTED: "SELECT_ITEM_IS_SELECTED"
        },
        SelectItemControlModel = BaseControlModel.extend({
            C: $.extend({}, C, BaseControlModel.prototype.C)
        });

    return SelectItemControlModel;
});
