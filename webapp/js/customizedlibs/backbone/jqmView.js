define([
        'jquery', 'jquerymobile', 'backbone'
    ], function ($, jqM, Backbone) {
        "use strict";
        Backbone.JQueryMobileView = Backbone.View.extend({
                initialize: function () {
                    this.on('view:inDOM', this.viewInDOM, this);
                    this.on('view:afterjqMInit', this.afterjqMInit, this);
                },

                model: new Backbone.Model(),
                additionalModel: new Backbone.Model(),
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
                    this.$el.empty();
                    if (this.template && this.model) {
                        this.$el.append(this.template(this.deepMerge(this.additionalModel, this.model)));
                    }
                    return this.el;
                },
                viewInDOM: function () {
                      return;
                },
                afterjqMInit: function() {
                    this.$el.trigger('create');
                },
                attributes: {
                  //  'data-role': 'content',
                  //  'class': 'ui-content'
                }
            });
        return Backbone.JQueryMobileView;
    });
