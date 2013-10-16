/*global $, define, require*/

define(['backbone', 'constantsrequestmodel'], function (Backbone, CM) {
    "use strict";
    var C = {

    }, BaseModel = Backbone.Model.extend({
            initialize: function () {
                var currentParam, cm, CurrentParamModel;
                for (cm in this.C) {
                    currentParam = this.C[cm];
                    if (currentParam && this.get(CM.get(cm)) !== undefined) {
                   
                        if (typeof currentParam === "function") {
                            if (currentParam.prototype instanceof Backbone.Model || currentParam.prototype instanceof Backbone.Collection) {
                                CurrentParamModel = currentParam;
                                this.set(cm, new CurrentParamModel(this.get(CM.get(cm))));
                
                            } 
                            else {
                                this.set(cm, currentParam(this.get(CM.get(cm))));
                            }
                        } 
                        else {
                            this.set(cm, this.get(CM.get(cm)));
                        }

                        this.unset(CM.get(cm), {
                            silent: true
                        });
                    }
                }

            },
            toJSON: function () {
                var returnjsonobj = Backbone.Model.prototype.toJSON.apply(this, arguments),
                p;
                for (p in returnjsonobj) {
                    if (returnjsonobj[p] instanceof Backbone.Model || returnjsonobj[p] instanceof Backbone.Collection) {
                        returnjsonobj[p] = returnjsonobj[p].toJSON();
                    }
                }
                return returnjsonobj;
            },
            parse: function (data) {
                var CurrentConstantParam,
                cm;
                for (cm in this.C) {
                    CurrentConstantParam = this.C[cm];
                    if (CurrentConstantParam && data[CM.get(cm)] !== undefined) {
                        if (typeof CurrentConstantParam === "function") {
                            if (CurrentConstantParam.prototype instanceof Backbone.Model || CurrentConstantParam.prototype instanceof Backbone.Collection) {
                                data[cm] = new CurrentConstantParam(data[CM.get(cm)]);
                            }
                        } else {
                            data[cm] = data[CM.get(cm)];
                        }
                        delete data[CM.get(cm)];
                    }
                }
                return data;
            },
            C: C
        });

    return BaseModel;
});
