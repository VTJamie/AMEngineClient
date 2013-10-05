/*global $, debug */

define(['jquery', 'jquerymobile', 'backbone'], function ($, jqM, Backbone) {
    "use strict";
    Backbone.JQueryMobilePage = Backbone.View.extend({
            initialize: function () {
                this.on('view:inDOM', this.viewInDOM, this);
                this.model = new Backbone.Model();
                this.additionalModel = new Backbone.Model();
            },

            model: undefined,
            additionalModel: undefined,
            deepMerge: function (firstobject, secondobject) {
                var newobject = {};
                if (firstobject !== undefined) {
                    newobject = $.extend(newobject, firstobject.toJSON ? firstobject.toJSON() : firstobject);
                }
                if (secondobject !== undefined) {
                    newobject = $.extend(newobject, secondobject.toJSON ? secondobject.toJSON() : secondobject);
                }
                return newobject;
            },
            render: function () {
                //     this.$el.empty();
                if (this.template && this.model) {
                    this.$el.append(this.template(this.deepMerge(this.additionalModel, this.model)));
                }
                return this.el;
            },
            attributes: {
                'data-role': 'page'
            },
            viewInDOM: function () {
                // $(':jqmData(role=page)').page().page("destroy").hide();
                // this.$el.show().page();
            }
        });
    return Backbone.JQueryMobilePage;
});
