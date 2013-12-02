/*global $, define, require, debug, angular*/

define(['jquery', 'jquerymobile', 'backbone', 'controlviewcollection', 'angular', 'app', 'refreshrequestmodel'], function ($, jqM, Backbone, ControlViewCollection, Angular, App, RefreshControlsRequestModel) {
    "use strict";
    angular.module('mercuryAngularControl', []);
    var C = {
            ID: "ID",
            IS_VISIBLE: "IS_VISIBLE",
            CHANGE_TRIGGERS_REFRESH: "CHANGE_TRIGGERS_REFRESH"
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
            onChange: function () {
                var that = this;
                if (this.model.get(C.CHANGE_TRIGGERS_REFRESH)) {
                    RefreshControlsRequestModel.request({}, function (model) {
                        return;
                    }, {
                        fields: [
                            that.model.get(C.ID)
                        ]
                    });
                }
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
                if (this.$el.is('[ng-app]')) {
                    this.syncScope();
                    this.$el.trigger("create");
                } else {
                    this.render();
                }

            },
            setupAngular: function () {
                if (this.$el.is('[ng-app]')) {
                    debug.log('Attempting to Bootstrap Angular', this.model.get("ID"));

                    angular.bootstrap(this.el, ['mercuryAngularControl']);
                    this.syncScope();
                }
            },
            syncScope: function () {
                var scope;
                if (this.$el.is('[ng-controller]')) {
                    scope = this.$el.scope();
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
