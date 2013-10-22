/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'basecontrolview', 'complexitemlisteditrequestmodel', 'complexitemlistnewrequestmodel', 'hbs!complexitemlisttemplate'], function (
    $, jqM, Backbone, BaseControlView, ComplexListItemEditRequestModel, ComplexListItemNewRequestModel, Template) {
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
                'click .amengine-complexitemlist-add': 'addItem'
            }, BaseControlView.prototype.events),
            getValue : function () {
                return {};
            },
            addItem: function() {
                ComplexListItemNewRequestModel.request({
                    REQUEST_FIELD_ACTION_PROPERTY_NAME: this.model.get(C.ID)
                }, function(responsemodel){
                    if (responsemodel.get(C.SESSION_VALID)) {
                        debug.log("Loading", responsemodel);
                        require(['app', 'dialogview'], function(App, DialogView){
                            App.loadPage(new DialogView({model: responsemodel}));
                        });

                    }
                    else {
                        Backbone.history.navigate('', {trigger: true});
                    }
                });
            },
            linkItemClicked: function(e) {
                ComplexListItemEditRequestModel.request({
                    REQUEST_COMPLEX_ITEM_ID: $(e.target).closest('tr').attr('data-id'),
                    REQUEST_FIELD_ACTION_PROPERTY_NAME: this.model.get(C.ID)
                }, function(responsemodel){
                    if (responsemodel.get(C.SESSION_VALID)) {
                        debug.log("Loading", responsemodel);
                        require(['app', 'dialogview'], function(App, DialogView){
                            App.loadPage(new DialogView({model: responsemodel}));
                        });

                    }
                    else {
                        Backbone.history.navigate('', {trigger: true});
                    }
                });
                return false;
            }
    });
    return ComplexItemListView;
});
