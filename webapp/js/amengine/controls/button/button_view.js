/*global $, define, require, window, debug*/

define(['jquery', 'jquerymobile', 'backbone', 'app', 'basecontrolview', 'hbs!buttontemplate', 'submitrequestmodel', 'pagecollection'], function ($, jqM, Backbone, App, BaseControlView, Template, SubmitRequestModel, PageCollection) {
    "use strict";
    var C = {
        LABEL: "LABEL",
        ID: "ID",
        BUTTON_ALLOW_RETURN_CLICK: "BUTTON_ALLOW_RETURN_CLICK",
        BUTTON_TYPE: "BUTTON_TYPE",
        BUTTON_TYPE_SUBMIT: "BUTTON_TYPE_SUBMIT",
        BUTTON_TYPE_CANCEL: "BUTTON_TYPE_CANCEL",
        REQUEST_FIELD_ACTION_PROPERTY_NAME: "REQUEST_FIELD_ACTION_PROPERTY_NAME",
        SUBMIT_RESPONSE_ACTION_LIST: "SUBMIT_RESPONSE_ACTION_LIST",
        SUBMIT_RESPONSE_ACTION_TYPE: "SUBMIT_RESPONSE_ACTION_TYPE",
        SUBMIT_RESPONSE_ACTION_TYPE_CLOSE: "SUBMIT_RESPONSE_ACTION_TYPE_CLOSE",
        ERRORS: "ERRORS",
        RESPONSE_BODY: "RESPONSE_BODY"
    }, ButtonView = BaseControlView.extend({
        initialize: function (options) {
            BaseControlView.prototype.initialize.apply(this, arguments);
        },
        events: {
            'tap': "buttonClicked",
            'keyup': 'keyUp'
        },
        template: Template,
        render: function () {
            BaseControlView.prototype.render.apply(this, arguments);

            this.setElement(this.$el.html().trim());
            return this.el;
        },
        attributes: {},
        buttonClicked: function (event) {
            var that = this,
            responsebody,
            lastpage;
            if (this.model.get(C.BUTTON_TYPE) === C.BUTTON_TYPE_SUBMIT) {
                SubmitRequestModel.request({
                    REQUEST_FIELD_ACTION_PROPERTY_NAME: this.model.get(C.ID)
                }, function (model) {

                    responsebody = model.get(C.RESPONSE_BODY);
                    if (responsebody.get(C.ERRORS).size() === 0) {
                        responsebody.get(C.SUBMIT_RESPONSE_ACTION_LIST).each(function (model) {
                            if (model.get(C.SUBMIT_RESPONSE_ACTION_TYPE) === C.SUBMIT_RESPONSE_ACTION_TYPE_CLOSE) {
                                if(PageCollection.length > 0) {
                                    lastpage = PageCollection.pop().get("page");
                                    $.mobile.changePage($(lastpage));
                                } else {
                                    window.history.back();
                                }

                                //App.vent.trigger('menu:reload');
                                event.preventDefault();
                            }
                        });
                    }
                });
            }
            else if (this.model.get(C.BUTTON_TYPE) === C.BUTTON_TYPE_CANCEL) {
                var lastpage;
                if(PageCollection.length > 0) {
                    lastpage = PageCollection.pop().get("page");
                    $.mobile.changePage($(lastpage));
                } else {
                    window.history.back();
                }
            }
        },
        keyUp: function(){


        },
        getValue: function () {
            return {};
        }
    });
    return ButtonView;
});
