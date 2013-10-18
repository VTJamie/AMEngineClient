/*global $, define, require*/

define(['jquery', 'backbone', 'constantsrequestmodel', 'controlviewmodel', 'app'], function ($, Backbone, CM, ControlViewModel, App) {
    "use strict";

    var C ={
        FIELD_PREFIX: "FIELD_PREFIX"
    },
    ControlViewCollection = Backbone.Collection.extend({
        model : ControlViewModel,
        _getFieldValues : function (inputoptions) {
            var valueobject = {},
            p,
            options = $.extend({withoutprefix: false, controlid: undefined}, inputoptions);

            this.each(function (model) {
                $.extend(valueobject, model.get("view").getValue());
            });
            for(p in valueobject){
                if(options.controlid === undefined || options.controlid === p) {
                    if(!options.withoutprefix) {
                        valueobject[CM.get(C.FIELD_PREFIX) + p] = valueobject[p];
                        delete valueobject[p];
                    }
                }
                else {
                    if(options.controlid !== p) {
                        delete valueobject[p];
                    }
                }
            }
            return valueobject;
        }
    }), currentpagecollection;

    ControlViewCollection.getFieldValues = function(options) {
        App.vent.trigger('loadactivecontrols.amengine');
        return ControlViewCollection.getCurrentInstance()._getFieldValues(options);
    };

    ControlViewCollection.getCurrentInstance = function () {
        if (currentpagecollection === undefined) {
            debug.log("Creating blank ControlViewCollection");
            currentpagecollection = new ControlViewCollection();
        }
        return currentpagecollection;
    };

    ControlViewCollection.setCurrentInstance = function (newinstance) {
        currentpagecollection = newinstance;
    };
    return ControlViewCollection;
});
