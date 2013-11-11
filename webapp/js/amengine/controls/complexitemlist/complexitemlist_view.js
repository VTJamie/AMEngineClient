/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'app', 'basecontrolview', 'complexitemlisteditrequestmodel', 'complexitemlistdeleterequestmodel', 'complexitemlistnewrequestmodel', 'refreshrequestmodel', 'hbs!complexitemlisttemplate'], function (
    $, jqM, Backbone, App, BaseControlView, ComplexListItemEditRequestModel, ComplexListItemDeleteRequestModel, ComplexListItemNewRequestModel, RefreshControlsRequestModel, Template) {
    "use strict";
    var C = {
        ID: "ID",
        SESSION_VALID: "SESSION_VALID"
    },
    ComplexItemListView = BaseControlView.extend({
            initialize: function (options) {
                BaseControlView.prototype.initialize.apply(this, arguments);
                this.template = Template;
            },
            events: $.extend({
                'click .complexitemlist-item': 'linkItemClicked',
                'click .amengine-complexitemlist-add': 'addItem',
                'click .amengine-complexitemlist-delete': 'deleteItem'
            }, BaseControlView.prototype.events),
            getValue : function () {
                return {};
            },
            addItem: function() {
                App.showLoader();
                ComplexListItemNewRequestModel.request({
                    REQUEST_FIELD_ACTION_PROPERTY_NAME: this.model.get(C.ID)
                }, function(responsemodel){
                    if (responsemodel.get(C.SESSION_VALID)) {
                        debug.log("Loading", responsemodel);
                        require(['app', 'dialogview'], function(App, DialogView){
                            App.loadPage(new DialogView({model: responsemodel}));
                            App.hideLoader();
                        });

                    }
                    else {
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
                }, function(responsemodel){
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
            linkItemClicked: function(e) {
                App.showLoader();
                ComplexListItemEditRequestModel.request({
                    REQUEST_COMPLEX_ITEM_ID: $(e.target).closest('tr').attr('data-id'),
                    REQUEST_FIELD_ACTION_PROPERTY_NAME: this.model.get(C.ID)
                }, function(responsemodel){
                    if (responsemodel.get(C.SESSION_VALID)) {
                        debug.log("Loading", responsemodel);
                        require(['app', 'dialogview'], function(App, DialogView){
                            App.loadPage(new DialogView({model: responsemodel}));
                            App.hideLoader();
                        });

                    }
                    else {
                        App.hideLoader();
                        Backbone.history.navigate('', {trigger: true});
                    }
                });
                return false;
            }
    });
    return ComplexItemListView;
});
