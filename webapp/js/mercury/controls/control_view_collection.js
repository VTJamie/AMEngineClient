/*global $, define, require, debug*/
/*jslint nomen: true, forin: true */
define(['jquery', 'backbone', 'constantsrequestmodel', 'controlviewmodel', 'app'], function ($, Backbone, CM, ControlViewModel, App) {
    "use strict";
    var C = {
            FIELD_PREFIX: "FIELD_PREFIX",
            ID: "ID",
            REFRESH_FIELD_PREFIX: "REFRESH_FIELD_PREFIX"
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
                for (p in valueobject) {
                    if (options.controlid === undefined && options.fields === undefined || options.controlid === p || $.inArray(p, options.fields) >= 0) {
                        if (!options.withoutprefix) {
                            valueobject[CM.get(C.FIELD_PREFIX) + p] = valueobject[p];
                            delete valueobject[p];
                        }
                    } else {
                        if (options.controlid !== p) {
                            delete valueobject[p];
                        }
                    }
                }
                return valueobject;
            },
            _getFieldView: function (viewid) {
                return this.find(function (viewmodel) {
                    return viewmodel.get("view").model.get(C.ID) === viewid;
                });
            }
        }),
        currentpagecollection;

    ControlViewCollection.getFieldValues = function (options) {
        App.vent.trigger('loadactivecontrols.mercury');
        return ControlViewCollection.getCurrentInstance()._getFieldValues(options);
    };

    ControlViewCollection.getFieldView = function (viewid) {
        App.vent.trigger('loadactivecontrols.mercury');
        return ControlViewCollection.getCurrentInstance()._getFieldView(viewid);
    };

    ControlViewCollection.getRefreshFields = function (options) {
        var returnobject = {};
        App.vent.trigger('loadactivecontrols.mercury');
        function isFieldName(curfieldname) {
            var idx;
            if (options !== undefined && options.fields !== undefined) {
                for (idx in options.fields) {
                    if (options.fields[idx] === curfieldname) {
                        return true;
                    }
                }
                return false;
            }

            return true;

        }
        ControlViewCollection.getCurrentInstance().each(function (curmodel) {
            if (isFieldName(curmodel.get("view").model.get(C.ID))) {
                returnobject[CM.get(C.REFRESH_FIELD_PREFIX) + curmodel.get("view").model.get(C.ID)] = true;
            }
        });
        return returnobject;
    };

    ControlViewCollection.getCurrentInstance = function () {
        if (currentpagecollection === undefined) {
            debug.log("Creating blank ControlViewCollection");
            currentpagecollection = new ControlViewCollection();
        }
        return currentpagecollection;
    };

    ControlViewCollection.reloadControls = function (reloadcontrolcollection) {

        ControlViewCollection.getCurrentInstance().each(function (curview) {
            var currentview =  curview.get("view"),
                newmodel = reloadcontrolcollection.findWhere({ID: currentview.model.get(C.ID)});
            if (newmodel !== undefined) {
                currentview.reloadModel(newmodel);
            }
        });
    };

    ControlViewCollection.setCurrentInstance = function (newinstance) {
        currentpagecollection = newinstance;
    };
    return ControlViewCollection;
});
