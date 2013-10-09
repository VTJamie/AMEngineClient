/*global $, define, require*/

define(['jquery', 'backbone', 'constantsrequestmodel', 'controlviewmodel'], function ($, Backbone, CM, ControlViewModel) {
    "use strict";

    var C ={
        FIELD_PREFIX: "FIELD_PREFIX"
    },
    ControlViewCollection = Backbone.Collection.extend({
        model : ControlViewModel,
        getFieldValues : function (options) {
            var valueobject = {};
            options = $.extend({withprefix: true, controlid: undefined}, options);
            this.each(function (model) {
                $.extend(valueobject, model.get("view").getValue());
            });

            for(var p in valueobject){
                if(options.controlid === undefined || options.controlid === p) {
                    if(options.withprefix === true) {
                        valueobject[CM.get(C.FIELD_PREFIX) + p] = valueobject[p];
                        delete valueobject[p];
                    }
                }
                else {
                    if(options.controlid === p) {
                        delete valueobject[p];
                    }
                }


            }
            return valueobject;
        }
    }), currentpagecollection;

    ControlViewCollection.getCurrentInstance = function () {
        if (currentpagecollection === undefined) {
            currentpagecollection = new ControlViewCollection();
        }
        return currentpagecollection;
    };
    return ControlViewCollection;
});
