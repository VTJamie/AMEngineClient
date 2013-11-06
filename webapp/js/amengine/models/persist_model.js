/*global $, define, require*/

define(['backbone', 'constantsrequestmodel'], function (Backbone, CM) {

    var C = {
        PERSISTED_PREFIX: "PERSISTED_PREFIX"
    },
        PersistModel = Backbone.Model.extend({

            getPersist: function () {
                return this.prependStringToJSON(CM.get(C.PERSISTED_PREFIX), this.toJSON());
            },
            prependStringToJSON: function (prefix, jsonobject) {
                var returnjsonobject = {},
                    p;
                for (p in jsonobject) {
                    returnjsonobject[prefix + p] = jsonobject[p];
                }
                return returnjsonobject;
            }
    });

    return new PersistModel();
});
