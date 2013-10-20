/*global $, define, require*/

define(['backbone', 'constantsrequestmodel', 'errorcollection', 'submitactioncollection', 'basemodel'], function (Backbone, CM, ErrorCollection, SubmitActionCollection, BaseModel) {
    "use strict";
    var constants = {

    }, C = {
        ERRORS: ErrorCollection,
        SUBMIT_RESPONSE_ACTION_LIST: SubmitActionCollection
    }, ComplexListItemSubmitResponseBodyModel = BaseModel.extend({
        C: $.extend(C, BaseModel.prototype.C)
    });

    return ComplexListItemSubmitResponseBodyModel;
});
