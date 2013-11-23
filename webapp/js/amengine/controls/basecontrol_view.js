/*global $, define, require, debug*/

define(['jquery', 'jquerymobile', 'backbone', 'controlviewcollection', 'angular'], function ($, jqM, Backbone, ControlViewCollection, Angular) {
    "use strict";
    var angularAppModule = angular.module('amengineAngularControl', []),
        C = {
            ID: "ID",
            IS_VISIBLE: "IS_VISIBLE"
        },
        BaseControlView = Backbone.View.extend({
            initialize: function (options) {
                if (options !== undefined) {
                    this.model = options.model;
                }
                ControlViewCollection.getCurrentInstance().add({view: this});
            },

            render: function () {

                this.$el.empty().append(this.template($.extend(
                    {},
                    this.model.toJSON(),
                    this.additionalModel ? this.additionalModel.toJSON() : {}
                )));
                this.$el.trigger("create");
                if (this.model.get(C.IS_VISIBLE)) {
                    this.$el.show();
                } else {
                    this.$el.hide();
                }
                return this.el;
            },
            attributes: {
                'data-role': 'fieldcontain'
            },
            getValue: function () {
                debug.log(this.model.get(C.ID), 'Control getValue not overridden');
                return {};
            },
            setErrorMessage: function (message) {
                this.$el.find('.error').empty().append("<span>" + message + "</span>");
            },
            reloadModel: function (newmodel) {
                this.model = newmodel;
                if(this.$el.is('[ng-app]')) {
                    this.syncScope();
                    this.$el.trigger("create");
                } else {
                    this.render();
                }

            },
            setupAngular: function () {
                 if(this.$el.is('[ng-app]')) {
                    debug.log('Attempting to Bootstrap Angular', this.model.get("ID"));

                    angular.bootstrap(this.el, ['amengineAngularControl']);
                    this.syncScope();
                }
            },
            syncScope: function () {
                var ngcontroller = this.$el.find('[ng-controller]'),
                    scope;
                if(ngcontroller.size() > 0) {
                    scope = angular.element(ngcontroller).scope();
                    scope.model = this.model.toJSON();

                    scope.$apply();
                }
            },
            onShow: function () {

                this.setupAngular();
            }
        });


    return BaseControlView;
});
