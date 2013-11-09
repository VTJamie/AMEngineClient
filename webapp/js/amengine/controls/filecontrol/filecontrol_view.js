/*global $, define, require*/

define(['jquery',
        'jquerymobile',
        'backbone',
        'basecontrolview',
        'hbs!filecontroltemplate',
        'jquery-fileupload',
        'jquery-fileupload-process',
        'jquery-fileupload-validate',
        'urlutility',
        'constantsrequestmodel',
        'pageresponsebodymodel',
        'persistmodel',
        'refreshrequestmodel'
        ], function ($, jqM, Backbone, BaseControlView, Template, fileuploadarg, fileuploadprocessarg, fileuploadvalidatearg, UrlUtility, CM, PageResponseBodyModel, PersistModel, RefreshControlsRequestModel) {
    "use strict";

    var C = {
        LABEL: "LABEL",
        CURRENT_VALUE: "CURRENT_VALUE",
        MAX_LENGTH: "MAX_LENGTH",
        PROTECTED_TEXT_FIELD: "PROTECTED_TEXT_FIELD",
        TEXT_BOX_TYPE: "TEXT_BOX_TYPE",
        TEXT_BOX_TYPE_TEXT_BOX: "TEXT_BOX_TYPE_TEXT_BOX",
        TEXT_BOX_TYPE_TEXT_AREA: "TEXT_BOX_TYPE_TEXT_AREA",
        EDITABLE: "EDITABLE",
        REQUIRED: "REQUIRED",
        REQUEST_TYPE_FIELD_REQUEST: "REQUEST_TYPE_FIELD_REQUEST",
        REQUEST_TYPE_IDENTIFIER: "REQUEST_TYPE_IDENTIFIER",
        REQUEST_TYPE_SUB_IDENTIFIER: "REQUEST_TYPE_SUB_IDENTIFIER",
        REQUEST_TYPE_SET_FILE: "REQUEST_TYPE_SET_FILE",
        REQUEST_FIELD_ACTION_PROPERTY_NAME: "REQUEST_FIELD_ACTION_PROPERTY_NAME",
        REQUEST_DATA_OBJECT_ID: "REQUEST_DATA_OBJECT_ID",
        RESPONSE_BODY: "RESPONSE_BODY",
        ID: "ID",
        REQUEST_OBJECT_NAME: "REQUEST_OBJECT_NAME",
        OBJECT_NAME: "OBJECT_NAME"
    }, FileView = BaseControlView.extend({
            initialize: function (options) {
                BaseControlView.prototype.initialize.apply(this, arguments);
                this.additionalModel = new Backbone.Model();
            },
            template: Template,
            getValue : function () {
                return {};
            },
            render: function () {
                var that = this;
                BaseControlView.prototype.render.apply(this, arguments);
                this.$el.find(".fileupload-control-link").on("click", function (e)
                {
                    var $tempform = that.$el.find('form'),
                        $persist = $tempform.find('.persist-section').empty(),
                        persistvalues = PersistModel.getPersist(),
                        name,
                        hiddenstr = "<input type='hidden' />",
                        $persisthidden;


                    for (name in persistvalues)
                    {
                        $persisthidden = $(hiddenstr);
                        $persisthidden.attr("name", name);
                        $persisthidden.attr("value", persistvalues[name]);
                        $persist.append($persisthidden);
                    }
                    $tempform.submit();
                    e.preventDefault();
                    return false;
                });


                this.$el.find('[type=file]').fileupload(
                {
                    url: UrlUtility.getBaseURL(),
                    //forceIframeTransport: true,
                    formData: function (form)
                    {
                        var criteriaarray = [],
                            currentpageresponsebody = PageResponseBodyModel.getCurrentInstance(),
                            persistvalues;

                        criteriaarray.push({
                            name: CM.get(C.REQUEST_TYPE_IDENTIFIER),
                            value: CM.get(C.REQUEST_TYPE_FIELD_REQUEST)
                        });
                        criteriaarray.push({
                            name: CM.get(C.REQUEST_TYPE_SUB_IDENTIFIER),
                            value: CM.get(C.REQUEST_TYPE_SET_FILE)
                        });
                        criteriaarray.push({
                            name: CM.get(C.REQUEST_FIELD_ACTION_PROPERTY_NAME),
                            value: that.model.get(C.ID)
                        });
                        criteriaarray.push({
                            name: CM.get(C.REQUEST_DATA_OBJECT_ID),
                            value: currentpageresponsebody.get(C.RESPONSE_BODY).get(C.ID)
                        });
                        criteriaarray.push({
                            name: CM.get(C.REQUEST_OBJECT_NAME),
                            value: currentpageresponsebody.get(C.RESPONSE_BODY).get(C.OBJECT_NAME)
                        });
                        persistvalues = PersistModel.getPersist();
                        for (var name in persistvalues)
                        {
                            criteriaarray.push({
                                name: name,
                                value: persistvalues[name]
                            });
                        }
                        return criteriaarray;
                    },
                    done: function (e, data)
                    {

                        var returndata = undefined;
                        if (data.result.contents != undefined)
                        {
                            returndata = eval("(" + data.result.contents().find('pre').html() + ")");
                        }
                        else
                        {
                            returndata = eval("(" + data.result + ")");
                        }

                        RefreshControlsRequestModel.request({}, function (model) {
                            debug.log(model);
                        }, {
                            fields: [
                                that.model.get(C.ID)
                            ]
                        });

                    }
                });
                return this.el;
            }

        });
    return FileView;
});
