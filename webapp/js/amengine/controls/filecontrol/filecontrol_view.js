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
        'persistmodel'
        ], function ($, jqM, Backbone, BaseControlView, Template, fileuploadarg, fileuploadprocessarg, fileuploadvalidatearg, UrlUtility, CM, PageResponseBodyModel, PersistModel) {
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
//                $(filenamelink).click(function ()
//                {
//                    var tempform = $("<form></form>")[0];
//                    if ($(controlcell).find("#" + controldef[adata.C[AMC.ID]] + "-iframe").size() > 0)
//                    {
//                        var tempiframe = $("<iframe name=" + controldef[adata.C[AMC.ID]] + "-iframe" + " id=" + controldef[adata.C[AMC.ID]] + "-iframe" + "/>")[0];
//                        $(controlcell).append(tempiframe);
//                        $(tempiframe).hide();
//                    }
//                    $(controlcell).append(tempform);
//
//                    $(tempform).hide();


//                    $(tempform).attr("name", controldef[adata.C[AMC.ID]] + "-form");
//                    $(tempform).attr("id", controldef[adata.C[AMC.ID]] + "-form");
                    // $(tempiframe).attr("name", controldef[adata.C[AMC.ID]] + "-iframe");
                    //$(tempiframe).attr("id", controldef[adata.C[AMC.ID]] + "-iframe");
//                    $(tempform).attr("method", "post");
//                    $(tempform).attr("action", adata.options.url);
//                    $(tempform).attr("target", $(tempiframe).attr("name"));
//                    var hiddenstr = "<input type='hidden' />";
//                    var requesttypeidentifier = $(hiddenstr)[0];
//                    $(requesttypeidentifier).attr("name", adata.C[AMC.REQUEST_TYPE_IDENTIFIER]);
//                    $(requesttypeidentifier).attr("value", adata.C[AMC.REQUEST_TYPE_FIELD_REQUEST]);
//                    $(tempform).append(requesttypeidentifier);
//
//                    var requesttypesubidentifier = $(hiddenstr)[0];
//                    $(requesttypesubidentifier).attr("name", adata.C[AMC.REQUEST_TYPE_SUB_IDENTIFIER]);
//                    $(requesttypesubidentifier).attr("value", adata.C[AMC.REQUEST_TYPE_GET_FILE]);
//                    $(tempform).append(requesttypesubidentifier);
//
//                    var requestfieldactionpropname = $(hiddenstr)[0];
//                    $(requestfieldactionpropname).attr("name", adata.C[AMC.REQUEST_FIELD_ACTION_PROPERTY_NAME]);
//                    $(requestfieldactionpropname).attr("value", controldef[adata.C[AMC.ID]]);
//                    $(tempform).append(requestfieldactionpropname);
//
//                    var requestobjectname = $(hiddenstr)[0];
//                    $(requestobjectname).attr("name", adata.C[AMC.REQUEST_OBJECT_NAME]);
//                    $(requestobjectname).attr("value", $(control).data(C.rootdefinition)[adata.C[AMC.RESPONSE_BODY]][adata.C[AMC.OBJECT_NAME]]);
//                    $(tempform).append(requestobjectname);
//
//                    var requestdataobjectid = $(hiddenstr)[0];
//                    $(requestdataobjectid).attr("name", adata.C[AMC.REQUEST_DATA_OBJECT_ID]);
//                    $(requestdataobjectid).attr("value", $(control).data(C.rootdefinition)[adata.C[AMC.RESPONSE_BODY]][adata.C[AMC.ID]]);
//                    $(tempform).append(requestdataobjectid);
//
//                    var persistdata = methods.getPersistPostCriteria.apply(curthis, []);
//                    for (var p in persistdata)
//                    {
//                        var persisthidden = $(hiddenstr)[0];
//                        $(persisthidden).attr("name", p);
//                        $(persisthidden).attr("value", persistdata[p]);
//                        $(tempform).append(persisthidden);
//                    }
//
//                    $(tempform).submit();
//
//                    $(tempform).remove();
//
//                    return false;
//                });
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

                        // postc[adata.C[AMC.REQUEST_DATA_OBJECT_ID]] = $(control).data(C.rootdefinition)[adata.C[AMC.RESPONSE_BODY]][adata.C[AMC.ID]];
                        //postc[adata.C[AMC.REQUEST_OBJECT_NAME]] = $(control).data(C.rootdefinition)[adata.C[AMC.RESPONSE_BODY]][adata.C[AMC.OBJECT_NAME]];
                        return criteriaarray;
                    },
                    done: function (e, data)
                    {
//                        var returndata = undefined;
//                        if (data.result.contents != undefined)
//                        {
//                            returndata = eval("(" + data.result.contents().find('pre').html() + ")");
//                        }
//                        else
//                        {
//                            returndata = eval("(" + data.result + ")");
//                        }
//
//                        if (methods.handlepostresponse.apply(curthis, [returndata]))
//                        {
//                            requests.reloadcontrol.apply(curthis, [control]);
//                        }
                    }
                });
                return this.el;
            }

        });
    return FileView;
});
