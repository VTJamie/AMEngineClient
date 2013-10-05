/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'basecontrolmodel'], function (
    Backbone, CM, BaseControlModel) {

    var constants = {
        CONTROL_TYPE_DATE: "CONTROL_TYPE_DATE"
    };
    var C = {

        CONTROL_TYPE: function (value) {
            return constants.CONTROL_TYPE_DATE;
        }
    };

    var DateControlModel = BaseControlModel.extend({
        C: $.extend(C, BaseControlModel.prototype.C)
    });

    return DateControlModel;
});
