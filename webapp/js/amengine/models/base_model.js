/*global $, define, require*/

define(['backbone', 'constantsrequestmodel'], function (Backbone, CM) {
    "use strict";
    var C = {

    }, CurrentParam, BaseModel = Backbone.Model.extend({
            initialize: function () {
                for (var cm in this.C) {
                    CurrentParam = this.C[cm];
                                     if(cm == "MENU_ITEM_SUB_LIST")
                {
                //    debug.log(CurrentParam);
                }
                    if (CurrentParam && typeof this.get(CM.get(cm)) !== "undefined") {
                   
                        if (typeof CurrentParam === "function") {
                            if (CurrentParam.prototype instanceof Backbone.Model || CurrentParam.prototype instanceof Backbone.Collection) {
                                this.set(cm, new CurrentParam(this.get(CM.get(cm))));
                
                            } 
                            else {
                                this.set(cm, CurrentParam(this.get(CM.get(cm))));
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
                var returnjsonobj = Backbone.Model.prototype.toJSON.apply(this, arguments);
                for (var p in returnjsonobj) {
                    if (returnjsonobj[p] instanceof Backbone.Model || returnjsonobj[p] instanceof Backbone.Collection) {
                        returnjsonobj[p] = returnjsonobj[p].toJSON();
                    }
                }
                return returnjsonobj;
            },
            parse: function (data) {
                for (var cm in this.C) {
                    CurrentParam = this.C[cm];
                    if (CurrentParam && typeof data[CM.get(cm)] !== "undefined") {
                        if (typeof CurrentParam === "function") {
                            if (CurrentParam.prototype instanceof Backbone.Model || CurrentParam.prototype instanceof Backbone.Collection) {
                                data[cm] = new CurrentParam(data[CM.get(cm)]);
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
