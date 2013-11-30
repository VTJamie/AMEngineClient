/*global $, define, require, debug, angular*/

define(['jquery', 'jquerymobile', 'backbone', 'app', 'basecontrolview', 'complexitemlisteditrequestmodel', 'complexitemlistdeleterequestmodel', 'complexitemlistnewrequestmodel', 'refreshrequestmodel', 'hbs!complexitemlisttemplate', 'angular', 'reloadgridrequestmodel'], function ($, jqM, Backbone, App, BaseControlView, ComplexListItemEditRequestModel, ComplexListItemDeleteRequestModel, ComplexListItemNewRequestModel, RefreshControlsRequestModel, Template, Angular, ReloadGridRequestModel) {
    "use strict";
    var angularAppModule = angular.module('mercuryAngularControl'),
        C = {
            ID: "ID",
            SESSION_VALID: "SESSION_VALID"
        },
        ComplexItemListView = BaseControlView.extend({
            initialize: function (options) {
                BaseControlView.prototype.initialize.apply(this, arguments);
            },
            template: Template,
            events: $.extend({
                'click .complexitemlist-item': 'linkItemClicked',
                'click .mercury-complexitemlist-add': 'addItem',
                'click .mercury-complexitemlist-delete': 'deleteItem'
            }, BaseControlView.prototype.events),
            attributes: $.extend({}, {
                'ng-app': 'mercuryAngularControl'
            }, BaseControlView.prototype.attributes),
            getValue : function () {
                return {};
            },
            addItem: function () {
                App.showLoader();
                ComplexListItemNewRequestModel.request({
                    REQUEST_FIELD_ACTION_PROPERTY_NAME: this.model.get(C.ID)
                }, function (responsemodel) {
                    if (responsemodel.get(C.SESSION_VALID)) {
                        debug.log("Loading", responsemodel);
                        require(['app', 'dialogview'], function (App, DialogView) {
                            App.loadPage(new DialogView({model: responsemodel}));
                            App.hideLoader();
                        });

                    } else {
                        App.hideLoader();
                        Backbone.history.navigate('', {trigger: true});
                    }
                });
            },
            deleteItem: function (e) {
                var that = this;
                App.showLoader();
                ComplexListItemDeleteRequestModel.request({
                    REQUEST_FIELD_ACTION_PROPERTY_NAME: this.model.get(C.ID),
                    REQUEST_COMPLEX_ITEM_ID: $(e.target).closest('tr').attr('data-id')
                }, function (responsemodel) {
                    RefreshControlsRequestModel.request({}, function (model) {
                        App.hideLoader();
                    }, {
                        fields: [
                            that.model.get(C.ID)
                        ]
                    });
                });

                e.preventDefault();
                return false;
            },
            linkItemClicked: function (e) {
                App.showLoader();
                ComplexListItemEditRequestModel.request({
                    REQUEST_COMPLEX_ITEM_ID: $(e.target).closest('tr').attr('data-id'),
                    REQUEST_FIELD_ACTION_PROPERTY_NAME: this.model.get(C.ID)
                }, function (responsemodel) {
                    if (responsemodel.get(C.SESSION_VALID)) {
                        debug.log("Loading", responsemodel);
                        require(['app', 'dialogview'], function (App, DialogView) {
                            App.loadPage(new DialogView({model: responsemodel}));
                            App.hideLoader();
                        });

                    } else {
                        App.hideLoader();
                        Backbone.history.navigate('', {trigger: true});
                    }
                });
                return false;
            }
        });
    angularAppModule.controller('complexItemListControl', ['$scope', '$element', function ($scope, $element) {
        $scope.preventKeyUp = function (event) {
            if (event.keyCode === 13) {
                event.stopPropagation();
                event.preventDefault();
                return false;
            }
        };
        $scope.reloadOnKeyDown = function (event) {
            if (event.keyCode === 13) {

                event.stopPropagation();
                event.preventDefault();
                ReloadGridRequestModel.request({

                    GRID_VIEW_RELOAD_REQUEST_PAGE:  $scope.model.GRID_VIEW_GRID_DETAILS.GRID_VIEW_CURRENT_PAGE,
                    GRID_VIEW_RELOAD_REQUEST_ROWS:  $scope.model.GRID_VIEW_GRID_DETAILS.GRID_VIEW_PAGE_SIZE,
                    GRID_VIEW_RELOAD_REQUEST_SORT_NAME:  '',
                    GRID_VIEW_RELOAD_REQUEST_SORT_ORDER: 'asc',
                    REQUEST_FIELD_ACTION_PROPERTY_NAME: $scope.model.ID
                }, function (model) {
                    $scope.model.GRID_VIEW_GRID_DETAILS = $.extend($scope.model.GRID_VIEW_GRID_DETAILS, model.toJSON().RESPONSE_BODY);
                    debug.log(model.toJSON().RESPONSE_BODY.GRID_VIEW_DATA);
                    $scope.$apply();
                    $($element).trigger("create");
                });
                return false;
            }
        };
        $scope.pageNumberBlur = function () {
            if ($scope.model && $scope.model.GRID_VIEW_GRID_DETAILS && $scope.model.GRID_VIEW_GRID_DETAILS.GRID_VIEW_CURRENT_PAGE === "") {
                $scope.model.GRID_VIEW_GRID_DETAILS.GRID_VIEW_CURRENT_PAGE = 1;
            }
        };
        $scope.pageSizeBlur = function () {
            if ($scope.model && $scope.model.GRID_VIEW_GRID_DETAILS && $scope.model.GRID_VIEW_GRID_DETAILS.GRID_VIEW_PAGE_SIZE === "") {
                $scope.model.GRID_VIEW_GRID_DETAILS.GRID_VIEW_PAGE_SIZE = 1;
            }
        };
    }]).directive('pageNumber', function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModel) {
                scope.$watch(attrs.ngModel, function (newvalue) {

                    var numpages = scope.$eval(attrs.pageNumber),
                        intvalue = (newvalue !== "" ? parseInt(newvalue, 10) : newvalue);
                    if (newvalue !== "" && intvalue > numpages) {
                        intvalue = numpages;
                    } else if (newvalue !== "" && intvalue <= 0) {
                        intvalue = 1;
                    }

                    if (ngModel.$viewValue !== intvalue && numpages > 0) {
                        ngModel.$setViewValue(intvalue);
                        ngModel.$render();
                    }
                });
            }
        };
    }).directive('pageSize', function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModel) {
                scope.$watch(attrs.ngModel, function (newvalue) {
                    var intvalue = (newvalue !== "" ? parseInt(newvalue, 10) : newvalue);

                    if (ngModel.$viewValue !== intvalue) {
                        ngModel.$setViewValue(intvalue);
                        ngModel.$render();
                    }
                });
            }
        };
    });
    return ComplexItemListView;
});
