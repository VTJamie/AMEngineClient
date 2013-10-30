/*global $, define, require, window, debug*/

define(['jquery', 'jquerymobile', 'backbone', 'app', 'basecontrolview', 'hbs!buttontemplate', 'submitrequestmodel', 'pagecollection', 'pageresponsebodymodel', 'complexitemlistsubmitrequestmodel'], function ($, jqM, Backbone, App, BaseControlView, Template, SubmitRequestModel, PageCollection, PageResponseBodyModel, ComplexListItemSubmitRequestModel) {
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
        RESPONSE_BODY: "RESPONSE_BODY",
        IS_DIALOG: "IS_DIALOG"
    }, ButtonView = BaseControlView.extend({
        initialize: function (options) {
            BaseControlView.prototype.initialize.apply(this, arguments);
            App.vent.on('enterpressed.amengine', this.enterPressed, this);
            App.vent.on('escapepressed.amengine', this.escapePressed, this);
        },
        remove: function () {
            App.vent.off('enterpressed.amengine');
            App.vent.off('escapepressed.amengine');
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
        enterPressed: function(e) {
            if(this.$el.closest('.ui-page-active').size() > 0 && this.model.get(C.BUTTON_TYPE) === C.BUTTON_TYPE_SUBMIT) {
                debug.log("Button", "enter pressed");
                this.buttonClicked(e);
            }
        },
        escapePressed: function(e) {
            if(this.$el.closest('.ui-page-active').size() > 0 && this.model.get(C.BUTTON_TYPE) === C.BUTTON_TYPE_CANCEL) {
                debug.log("Escape", "enter pressed");
                this.buttonClicked(e);
            }
        },
        buttonClicked: function (event) {
            var that = this,
            responsebody,
            lastpage,
            isdialog = PageResponseBodyModel.getCurrentInstance().get(C.RESPONSE_BODY).get(C.IS_DIALOG);
            function goBack() {
                if(PageCollection.length > 0) {
                    lastpage = PageCollection.pop().get("page");
                    $.mobile.changePage($(lastpage));
                } else {
                    window.history.back();
                }
            }
            function handleResponseActionList(responsemodel, e) {
                responsebody = responsemodel.get(C.RESPONSE_BODY);
                if (responsebody.get(C.ERRORS).size() === 0) {
                    responsebody.get(C.SUBMIT_RESPONSE_ACTION_LIST).each(function (model) {
                        if (model.get(C.SUBMIT_RESPONSE_ACTION_TYPE) === C.SUBMIT_RESPONSE_ACTION_TYPE_CLOSE) {
                            goBack();
                            if(event) {
                                event.preventDefault();
                            }
                        }
                    });
                }
            }
            if (this.model.get(C.BUTTON_TYPE) === C.BUTTON_TYPE_SUBMIT) {
                if(isdialog) {
                    ComplexListItemSubmitRequestModel.request({
                        REQUEST_FIELD_ACTION_PROPERTY_NAME: this.model.get(C.ID)
                    }, function (model) {
                        handleResponseActionList(model, event);
                    });
                }
                else
                {
                    SubmitRequestModel.request({
                        REQUEST_FIELD_ACTION_PROPERTY_NAME: this.model.get(C.ID)
                    }, function (model) {
                        handleResponseActionList(model, event);
                    });
                }
            }
            else if (this.model.get(C.BUTTON_TYPE) === C.BUTTON_TYPE_CANCEL) {
                goBack();
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
