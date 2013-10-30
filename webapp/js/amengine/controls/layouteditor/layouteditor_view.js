/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'constantsrequestmodel', 'basecontrolview', 'Handlebars', 'hbs!layouteditortemplate', 'hbs!layouteditoravailablepartialtemplate', 'hbs!layouteditordroppartialtemplate'], function (
    $, jqM, Backbone, CM, BaseControlView, HBS, Template, AvailablePartial, DropPartial) {
    "use strict";
    HBS.registerPartial('droppartial', DropPartial);
    HBS.registerPartial('availablepartial', AvailablePartial);
    var C = {
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
                $parentobj,
                isitem,
                isgroup;
            function getchildobj(parentobj)
            {
                var tempobj;
                tempobj = {};
                $parentobj = $(parentobj);

                isitem = $parentobj.hasClass(C.CONTROL_LAYOUT_EDITOR_ITEM_TYPE_ITEM);
                isgroup = $parentobj.hasClass(C.CONTROL_LAYOUT_EDITOR_ITEM_TYPE_GROUP);
             //   childobj = {};
                if(!isitem && !isgroup) {
                    $parentobj.children().each(function(idx, item) {
                        $.extend(tempobj, getchildobj(item));
                    });
                }
                else {
                    tempobj[CM.get(C.CONTROL_LAYOUT_EDITOR_ITEM_IDENTIFIER)] = $parentobj.text().trim();

                    if (isgroup)
                    {

                        tempobj[CM.get(C.CONTROL_LAYOUT_EDITOR_ITEM_NUMBER_OF_COLUMNS)] = $(parentobj).attr('data-numcols');
                        tempobj[CM.get(C.CONTROL_LAYOUT_EDITOR_ITEM_CHILD_ITEMS)] = [];

    //                    var $tr = $(parentobj).find('tr:first');
    //                    var $td = $tr.children();
    //                    var arrofitemarr = [];
    //                    $td.each(function (idx, item)
    //                    {
    //                        arrofitemarr[idx] = [];
    //
    //                        $(item).children().each(function(childidx, childitem)
    //                        {
    //                            arrofitemarr[idx][arrofitemarr[idx].length] = getchildobj(childitem);
    //                        });
    //                    });
    //
    //                    var longestlen = 0;
    //                    for (var i in arrofitemarr)
    //                    {
    //                        if (arrofitemarr[i].length > longestlen)
    //                        {
    //                            longestlen = arrofitemarr[i].length;
    //                        }
    //                    }
    //                    for (var i = 0; i < longestlen; i++)
    //                    {
    //                        for (var j = 0; j < arrofitemarr.length; j++)
    //                        {
    //                            if (i < arrofitemarr[j].length)
    //                            {
    //                                childobj[adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_CHILD_ITEMS]][childobj[adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_CHILD_ITEMS]].length] = arrofitemarr[j][i];
    //                            }
    //                        }
    //                    }
    //
                    }
                }

                return tempobj;
            }
            returnobj[CM.get(C.CONTROL_LAYOUT_EDITOR_RETURN_OBJECT_ROOT)] = [];
            $droparea.children().each(function (idx, item)
            {
                returnobj[CM.get(C.CONTROL_LAYOUT_EDITOR_RETURN_OBJECT_ROOT)].push(getchildobj(item));
            });

           debug.log(JSON.stringify(returnobj));
          //  return JSON.stringify(returnobj);
               return BaseControlView.prototype.getValue.apply(this, arguments);
            },
            render: function() {
               BaseControlView.prototype.render.apply(this, arguments);

//                                if (controldef[adata.C[AMC.IS_VISIBLE]])
//                                {
//
//                                    function appendgroupsortable(curgroup)
//                                    {
//                                        if (!$(curgroup).data("alreadyloaded"))
//                                        {
//                                            var numberofcols = parseInt($(curgroup).attr("numcols"));
//                                            $(curgroup).data("alreadyloaded", true);
//                                            $(curgroup).find('.portlet-content').append("<tr style='min-height: 40px;'></tr>");
//                                            $(curgroup).find('.portlet-content').css('min-height', 40);
//                                            $(curgroup).find('.ui-widget-header:first').append("<span class='ui-icon ui-icon-trash'></span>");
//                                            $(curgroup).find('.ui-widget-header:first .ui-icon:first').click(function ()
//                                            {
//                                                function removeallchild(currentobj)
//                                                {
//                                                    $(currentobj).children().each(function ()
//                                                    {
//                                                        removeallchild(this);
//                                                    });
//                                                    if ($(currentobj).data("itemdef") && $(currentobj).data("itemdef")[adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_TYPE]] == adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_TYPE_ITEM])
//                                                    {
//                                                        processitem(availablecontent, $(currentobj).data("itemdef"));
//                                                    }
//                                                    $(currentobj).remove();
//                                                }
//                                                removeallchild($(this).parent().parent()[0]);

//                                            });
//                                            var percentage = 100 / numberofcols;
//                                            for (var i = 0; i < numberofcols; i++)
//                                            {
//                                                $(curgroup).find('.portlet-content tr').append("<td class='ui-widget-content' style='min-height: 40px; padding-left: 5px; padding-right: 5px; width: " + percentage + "%; vertical-align: top'></td>");
//                                            }


//                                            $(curgroup).find(".portlet-content td").sortable(
//                                                       {
//                                                           connectWith: ".layoutcontrol-sortable-" + controldef[adata.C[AMC.ID]] + "-" + rootid,
//                                                           tolerance: "pointer",
//                                                           start: function (event, ui)
//                                                           {
//                                                               ui.helper.data('itemdef', $(this).data('itemdef'));
//                                                               //   $("body").append(ui.item.html());
//                                                           },
//
//                                                           receive: function(event, ui)
//                                                           {
//                                                               if ($(this).data("uiSortable") && $(this).data("uiSortable").currentItem)
//                                                               {
//                                                                   $(this).data("uiSortable").currentItem.data('itemdef', ui.item.data('itemdef'));
//                                                               }
//                                                               if (ui.helper)
//                                                               {
//                                                                   ui.item.data('itemdef', ui.helper.data('itemdef'));
//                                                                   ui.helper.data("dropped", true);
//                                                               }
//                                                           },
//                                                           stop: function (event, ui)
//                                                           {
//                                                               if (ui.item.hasClass("layoutcontrol-group-" + controldef[adata.C[AMC.ID]] + "-" + rootid))
//                                                               {
//                                                                   appendgroupsortable(ui.item[0]);
//                                                               }
//                                                               else
//                                                               {
//                                                                   if ($(ui.item[0]).find('.ui-widget-header:first .ui-icon-trash').size() == 0)
//                                                                   {
//                                                                       $(ui.item[0]).find('.ui-widget-header:first').append("<span class='ui-icon ui-icon-trash'></span>");
//                                                                       $(ui.item[0]).find('.ui-widget-header:first .ui-icon:first').click(function ()
//                                                                       {
//                                                                           processitem(availablecontent, $(this).parent().parent().data("itemdef"), false);
//                                                                           $(this).parent().parent().remove();
//                                                                           //  $(availablecontent).append($(this).parent().parent());
//                                                                           //   $(this).remove();
//                                                                           // alert($(this).parent().parent().data('itemdef')[adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_IDENTIFIER]]);
//                                                                       });
//                                                                   }
//                                                               }
//                                                           }
//                                                       });
//                                            $(curgroup).find(".portlet-content td").addClass("layoutcontrol-sortable-" + controldef[adata.C[AMC.ID]] + "-" + rootid)
//                                                .addClass("layoutcontrol-group-sortable-" + controldef[adata.C[AMC.ID]] + "-" + rootid)
//                                                .addClass("layoutcontrol-item-sortable-" + controldef[adata.C[AMC.ID]] + "-" + rootid);
//                                        }
//                                    }
//                                    function processitem(itemparent, itemdef, addsortable)
//                                    {
//                                        if (itemdef[adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_TYPE]] == adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_TYPE_GROUP])
//                                        {
//                                            var curdiv = $("<div class='portlet ui-widget-content'><div class='portlet-header ui-widget-header' style='cursor: pointer'>" + itemdef[adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_IDENTIFIER]] + "</div><table class='portlet-content' style='width: 100%;'></table></div>")[0];
//
//                                            $(curdiv).attr("numcols", itemdef[adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_NUMBER_OF_COLUMNS]]);
//                                            $(curdiv).addClass("layoutcontrol-group-" + controldef[adata.C[AMC.ID]] + "-" + rootid);
//                                            $(itemparent).append(curdiv);
//                                            if (addsortable)
//                                            {
//                                                appendgroupsortable(curdiv);
//                                                var numcols = itemdef[adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_NUMBER_OF_COLUMNS]];
//                                                var curcol = 0;
//                                                for (var itemidx in itemdef[adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_CHILD_ITEMS]])
//                                                {
//                                                    if (curcol == numcols)
//                                                    {
//                                                        curcol = 0;
//                                                    }
//
//                                                    processitem($(curdiv).find(".portlet-content td:eq(" + curcol + ")")[0], itemdef[adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_CHILD_ITEMS]][itemidx], addsortable);
//                                                    curcol++;
//                                                }
//                                            }
//                                            else
//                                            {
//                                               $(curdiv).draggable(
//                                                {
//                                                    connectToSortable: ".layoutcontrol-sortable-" + controldef[adata.C[AMC.ID]] + "-" + rootid,
//                                                    helper: 'clone',
//                                                    revert: 'invalid',
//                                                    cursor: "move",
//                                                    start: function (event, ui)
//                                                    {
//                                                        ui.helper.data('itemdef', $(this).data('itemdef'));
//
//                                                    }
//                                                });
//                                            }
//                                            $(curdiv).data("itemdef", itemdef);
//
//                                        }
//                                        else
//                                        {

//                                            var curdiv = $("<div class='portlet'><div class='portlet-header ui-widget-header' style='cursor: pointer'>" + itemdef[adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_IDENTIFIER]] + "</div></div>")[0];
//
//                                            if (addsortable)
//                                            {
//                                                $(curdiv).find('.ui-widget-header:first').append("<span class='ui-icon ui-icon-trash'></span>");
//                                                $(curdiv).find('.ui-widget-header:first .ui-icon:first').click(function ()
//                                                {
//                                                    processitem(availablecontent, itemdef, false);
//                                                    $(this).parent().parent().remove();
//                                                });
//                                            }
//                                            $(curdiv).addClass("layoutcontrol-just-item-" + controldef[adata.C[AMC.ID]] + "-" + rootid);

                                            this.$el.find('.available-items .available-item').draggable({
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
//                                            $(itemparent).append(curdiv);
//                                            $(curdiv).data("itemdef", itemdef);
//                                        }
//
//                                    }
//
//                                    for (var ci in controldef[adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_CHILD_ITEMS]])
//                                    {
//                                        processitem(dropareacontent, controldef[adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_CHILD_ITEMS]][ci], true);
//                                    }
//
//                                    for (var ci in controldef[adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_AVAILABLE_ITEMS]])
//                                    {
//                                        processitem(availablecontent, controldef[adata.C[AMC.CONTROL_LAYOUT_EDITOR_ITEM_AVAILABLE_ITEMS]][ci], false);
//                                    }
                                    this.$el.find('.drop-area').sortable(
                                         {
                                            // connectWith: ".layoutcontrol-sortable-" + controldef[adata.C[AMC.ID]] + "-" + rootid,
                                             tolerance: "pointer",
                                             start: function (event, ui)
                                             {


                                             },
                                             receive: function(event, ui)
                                             {
//                                                 if ($(this).data("uiSortable") && $(this).data("uiSortable").currentItem)
//                                                 {
//                                                     $(this).data("uiSortable").currentItem.data('itemdef', ui.item.data('itemdef'));
//                                                 }
                                                 if (ui.helper)
                                                 {
                                                     //ui.item.data('itemdef', ui.helper.data('itemdef'));
                                                     ui.helper.data("dropped", true);
                                                 }

                                             },
                                             stop: function (event, ui)
                                             {

//                                                 if (ui.item.hasClass("layoutcontrol-group-" + controldef[adata.C[AMC.ID]] + "-" + rootid))
//                                                 {
//                                                     appendgroupsortable(ui.item[0]);
//                                                 }
//                                                 else
//                                                 {
//                                                     if ($(ui.item[0]).find('.ui-widget-header:first .ui-icon-trash').size() == 0)
//                                                     {
//                                                         $(ui.item[0]).find('.ui-widget-header:first').append("<span class='ui-icon ui-icon-trash'></span>");
//                                                         $(ui.item[0]).find('.ui-widget-header:first .ui-icon:first').click(function ()
//                                                         {
//                                                             processitem(availablecontent, $(this).parent().parent().data("itemdef"), false);
//                                                             $(this).parent().parent().remove();
//                                                         });
//                                                     }
//                                                 }
                                             }
                                         });
//
//                                }
//                                else
//                                {
//                                    //Invisible
//                                }
//                            }
              //          },
              return this.el;
            }
    });
    return LayoutEditorView;
});
