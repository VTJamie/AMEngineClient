/*global $, define, require*/

define(['backbone', 'basegroupmodel'], function (Backbone, BaseGroupModel) {
    var constants = {
        GROUP_TYPE_TABLE: "GROUP_TYPE_TABLE"
    };
    var C = {
        GROUP_TABLE_NUMBER_OF_COLUMNS: "GROUP_TABLE_NUMBER_OF_COLUMNS",
        "GROUP_TYPE": function (value) {
            return constants.GROUP_TYPE_TABLE;
        }
    };

    var TableGroupModel = BaseGroupModel.extend({
        C: $.extend(C, BaseGroupModel.prototype.C)
    });

    return TableGroupModel;
});
