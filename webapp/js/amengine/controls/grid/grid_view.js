/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'basecontrolview', 'griddeleterowrequestmodel', 'refreshrequestmodel', 'hbs!gridtemplate', 'angular', 'reloadgridrequestmodel'], function ($, jqM, Backbone, BaseControlView, GridDeleteRowRequestModel, RefreshControlsRequestModel, Template, Angular, ReloadGridRequestModel) {
    "use strict";
    var angularAppModule = angular.module('amengineAngularControl'),
        C = {
            LABEL: "LABEL",
            firstloaddataobj: "firstload",
            ID: "ID",

            GRID_VIEW_COLUMN_LIST: "GRID_VIEW_COLUMN_LIST",
            GRID_VIEW_COLUMN_NAME: "GRID_VIEW_COLUMN_NAME",
            GRID_VIEW_COLUMN_IS_VISIBLE: "GRID_VIEW_COLUMN_IS_VISIBLE",
            GRID_VIEW_COLUMN_TYPE: "GRID_VIEW_COLUMN_TYPE",
            GRID_VIEW_ROW_CELL_DATA_ARRAY: "GRID_VIEW_ROW_CELL_DATA_ARRAY",
            GRID_VIEW_DATA_OBJECT_LAUNCH: "GRID_VIEW_DATA_OBJECT_LAUNCH",
            GRID_VIEW_DATA_OBJECT_LAUNCH_OBJECT_NAME: "GRID_VIEW_DATA_OBJECT_LAUNCH_OBJECT_NAME",
            GRID_VIEW_DATA_OBJECT_LAUNCH_TARGET_FIELD: "GRID_VIEW_DATA_OBJECT_LAUNCH_TARGET_FIELD",


            GRID_VIEW_GRID_DETAILS: "GRID_VIEW_GRID_DETAILS",

            GRID_VIEW_RELOAD_REQUEST_PAGE: "GRID_VIEW_RELOAD_REQUEST_PAGE",
            GRID_VIEW_RELOAD_REQUEST_ROWS: "GRID_VIEW_RELOAD_REQUEST_ROWS",
            GRID_VIEW_RELOAD_REQUEST_SORT_NAME: "GRID_VIEW_RELOAD_REQUEST_SORT_NAME",
            GRID_VIEW_RELOAD_REQUEST_SORT_ORDER: "GRID_VIEW_RELOAD_REQUEST_SORT_ORDER",

            RESPONSE_BODY: "RESPONSE_BODY",
            GRID_VIEW_CURRENT_PAGE: "GRID_VIEW_CURRENT_PAGE",
            GRID_VIEW_NUMBER_OF_PAGES: "GRID_VIEW_NUMBER_OF_PAGES",
            GRID_VIEW_TOTAL_NUMBER: "GRID_VIEW_TOTAL_NUMBER"
        },
        GridView = BaseControlView.extend({
            initialize: function (options) {
                BaseControlView.prototype.initialize.apply(this, arguments);
            },
            template: Template,
            attributes: $.extend({}, {
                "class": "ui-corner-all amengine-table",
               'ng-app': 'amengineAngularControl'
            }, BaseControlView.prototype.attributes),
            getValue : function () {
                return {};
            },
            events: {
                'tap .grid-delete-button': 'deleteButtonPressed'
            },
            deleteButtonPressed: function (e) {
                var that = this;
                GridDeleteRowRequestModel.request({
                    REQUEST_FIELD_ACTION_PROPERTY_NAME: this.model.get(C.ID),
                    REQUEST_GRID_VIEW_ITEM_ID: $(e.target).closest('a').attr('data-id')
                }, function (model) {
                    RefreshControlsRequestModel.request({}, function (model) {
                        return;
                    }, {
                        fields: [
                            that.model.get(C.ID)
                        ]
                    });
                });
                e.preventDefault();
                return false;
            },
            render: function () {
                BaseControlView.prototype.render.apply(this, arguments);
                return this.el;
            }
        });

    angularAppModule.controller('gridControl', ['$scope', '$element', function($scope, $element) {
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
                        intvalue = (newvalue !== "" ? parseInt(newvalue) : newvalue);
                    if (newvalue !== "" && intvalue > numpages) {
                        intvalue = numpages;
                    } else if (newvalue !== "" && intvalue <= 0) {
                        intvalue = 1;
                    }

                    if(ngModel.$viewValue !== intvalue && numpages > 0) {
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
                    var intvalue = (newvalue !== "" ? parseInt(newvalue) : newvalue);

                    if(ngModel.$viewValue !== intvalue) {
                        ngModel.$setViewValue(intvalue);
                        ngModel.$render();
                    }
                });
            }
        };
    });
    return GridView;
});
