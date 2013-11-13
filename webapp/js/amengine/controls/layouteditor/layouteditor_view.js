/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'constantsrequestmodel', 'basecontrolview', 'Handlebars', 'hbs!layouteditortemplate', 'hbs!layouteditoravailablepartialtemplate', 'hbs!layouteditordroppartialtemplate'], function (
    $, jqM, Backbone, CM, BaseControlView, HBS, Template, AvailablePartial, DropPartial) {
    "use strict";
    HBS.registerPartial('droppartial', DropPartial);
    HBS.registerPartial('availablepartial', AvailablePartial);
    var C = {
        ID: "ID",
        LABEL: "LABEL",
        CURRENT_VALUE: "CURRENT_VALUE",
        EDITABLE: "EDITABLE",
        REQUIRED: "REQUIRED",
        CONTROL_LAYOUT_EDITOR_ITEM_TYPE_ITEM: "CONTROL_LAYOUT_EDITOR_ITEM_TYPE_ITEM",
        CONTROL_LAYOUT_EDITOR_ITEM_TYPE_GROUP: "CONTROL_LAYOUT_EDITOR_ITEM_TYPE_GROUP",
        CONTROL_LAYOUT_EDITOR_RETURN_OBJECT_ROOT: "CONTROL_LAYOUT_EDITOR_RETURN_OBJECT_ROOT",
        CONTROL_LAYOUT_EDITOR_ITEM_IDENTIFIER: "CONTROL_LAYOUT_EDITOR_ITEM_IDENTIFIER",
        CONTROL_LAYOUT_EDITOR_ITEM_NUMBER_OF_COLUMNS: "CONTROL_LAYOUT_EDITOR_ITEM_NUMBER_OF_COLUMNS",
        CONTROL_LAYOUT_EDITOR_ITEM_CHILD_ITEMS: "CONTROL_LAYOUT_EDITOR_ITEM_CHILD_ITEMS"
    },
    LayoutEditorView = BaseControlView.extend({
        initialize: function (options) {
            BaseControlView.prototype.initialize.apply(this, arguments);
        },
        template: Template,
        events: {
            'click .layouteditor-trash-button': 'removeItem'
        },
        removeItem: function(e) {
            debug.log($(e.target).closest('li')[0]);
            e.preventDefault();
            return false;
        },
        getValue : function () {

            var $droparea = this.$el.find('.drop-items'),
                resultobj = {},
                curthis = this,
                returnobj = {},
                valueobject = {};
            function getchildobj(curobj)
            {
                var tempobj,
                    $curobj = $(curobj),
                    isgroup = $curobj.hasClass(C.CONTROL_LAYOUT_EDITOR_ITEM_TYPE_GROUP),
                    isdropitem = $curobj.hasClass('drop-item'),
                    $curlabel,
                    returnobj;

                if(!isdropitem) {
                    $curobj.children().each(function(idx, item) {
                        if(!tempobj) {
                            tempobj = getchildobj(item);
                        }
                    });
                }
                else {
                    tempobj = {};
                    $curlabel = $curobj.find(' > div > span.layouteditor-label');
                    isgroup = $curlabel.hasClass(C.CONTROL_LAYOUT_EDITOR_ITEM_TYPE_GROUP);
                    tempobj[CM.get(C.CONTROL_LAYOUT_EDITOR_ITEM_IDENTIFIER)] = $curlabel.text().trim();
                    if (isgroup)
                    {
                        tempobj[CM.get(C.CONTROL_LAYOUT_EDITOR_ITEM_NUMBER_OF_COLUMNS)] = parseInt($curlabel.attr('data-numcols'), 10);
                        tempobj[CM.get(C.CONTROL_LAYOUT_EDITOR_ITEM_CHILD_ITEMS)] = [];
                        $curobj.find(' > ul > li').each(function (idx, item) {
                            tempobj[CM.get(C.CONTROL_LAYOUT_EDITOR_ITEM_CHILD_ITEMS)].push(getchildobj(item));
                        });
                    }
                }

                return tempobj;
            }
            returnobj[CM.get(C.CONTROL_LAYOUT_EDITOR_RETURN_OBJECT_ROOT)] = [];
            $droparea.children().each(function (idx, item)
            {
                returnobj[CM.get(C.CONTROL_LAYOUT_EDITOR_RETURN_OBJECT_ROOT)].push(getchildobj(item));
            });

           valueobject[this.model.get(C.ID)] = JSON.stringify(returnobj);
           return valueobject;
        },
        render: function() {
            BaseControlView.prototype.render.apply(this, arguments);

            this.$el.find('.available-items .drop-item').draggable({
                connectToSortable: '.drop-area',
                revert: "invalid",
                helper: "clone",
                start: function(event, ui)
                {
               //     ui.helper.data('itemdef',$(this).data('itemdef'));
                    if(!ui.helper.hasClass(C.CONTROL_LAYOUT_EDITOR_ITEM_TYPE_GROUP)) {
                        $(this).hide();
                    }

                },

                stop: function(event, ui)
                {
                    if (!ui.helper.data('dropped') || ui.helper.hasClass(C.CONTROL_LAYOUT_EDITOR_ITEM_TYPE_GROUP))
                    {
                        $(this).show();
                    }
                    else
                    {
                        $(this).remove();
                    }

                },
                cursor: "move"
            });
            this.$el.find('.drop-area').sortable(
                 {
                    // connectWith: ".layoutcontrol-sortable-" + controldef[adata.C[AMC.ID]] + "-" + rootid,
                     tolerance: "pointer",
                     start: function (event, ui)
                     {


                     },
                     receive: function(event, ui)
                     {
                         if (ui.helper)
                         {
                             ui.helper.data("dropped", true);
                         }
                     },
                     stop: function (event, ui)
                     {

                     }
                 });
            return this.el;
        }
    });
    return LayoutEditorView;
});
