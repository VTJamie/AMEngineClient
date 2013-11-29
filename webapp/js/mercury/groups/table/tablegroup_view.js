/*global $, require, define */

define(['jquery', 'jquerymobile', 'backbone', 'hbs!tablegrouptemplate'], function ($, jqM, Backbone, Template) {
    "use strict";
    var C = {
            CONTROL_ARRAY: "CONTROL_ARRAY",
            GROUP_TABLE_NUMBER_OF_COLUMNS: "GROUP_TABLE_NUMBER_OF_COLUMNS"
        },
        TableView = Backbone.View.extend({
            initialize: function (options) {
                if (options !== undefined) {
                    this.model = options.model;
                }
            },
            template: Template,
            render: function () {

                this.$el.empty().append(this.template(this.model.toJSON()));

                var controlarray = this.model.get(C.CONTROL_ARRAY),
                    newitem,
                    grouparray = ["a", "b", "c", "d", "e", "f", "g", "h"],
                    curgroup = 0,
                    numcolumns = this.model.get(C.GROUP_TABLE_NUMBER_OF_COLUMNS),
                    idx,
                    runFactory = require('factory');
                if (numcolumns > 1) {
                    this.$el.addClass('ui-grid-' + grouparray[numcolumns - 2]);
                }

                for (idx = 0; idx < controlarray.length; idx += 1) {
                    if (curgroup >= grouparray.length || curgroup >= numcolumns) {
                        curgroup = 0;
                    }
                    newitem = runFactory(controlarray.at(idx));

                    if (numcolumns > 1) {
                        $(newitem).addClass('ui-block-' + grouparray[curgroup]);
                    }
                    this.$el.append(newitem);
                    curgroup += 1;
                }
                this.$el.trigger("create");
                return this.el;
            },
            attributes: {

            }
        });
    return TableView;
});
