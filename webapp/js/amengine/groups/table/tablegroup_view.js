/*global $, require, define */

define(['jquery', 'jquerymobile', 'backbone', 'factory', 'hbs!tablegrouptemplate'], function ($, jqM, Backbone, Factory, Template) {
    "use strict";
    var C = {
        CONTROL_ARRAY: "CONTROL_ARRAY",
        GROUP_TABLE_NUMBER_OF_COLUMNS: "GROUP_TABLE_NUMBER_OF_COLUMNS"
    }, TableView = Backbone.View.extend({
        initialize: function (options) {
            if ( typeof options !== "undefined") {
                this.model = options.model;
            }
        },
        render: function () {

            this.$el.empty().append(Template(this.model.toJSON()));

            var controlarray = this.model.get(C.CONTROL_ARRAY),
            newitem,
            grouparray = ("a,b,c,d,e,f,g,h").split(","),

            curgroup = 0,
            numcolumns = this.model.get(C.GROUP_TABLE_NUMBER_OF_COLUMNS);
            if(numcolumns > 1){
                this.$el.addClass('ui-grid-' + grouparray[numcolumns-2]);
            }

            for (var idx = 0; idx < controlarray.length; idx++) {
                if (curgroup >= grouparray.length || curgroup >= numcolumns) {
                    curgroup = 0;
                }
                newitem = Factory(controlarray.at(idx));

                if(numcolumns > 1){
                    $(newitem).addClass('ui-block-' + grouparray[curgroup]);
                }
                this.$el.append(newitem);
                curgroup++;
            }
            this.$el.trigger("create");
            return this.el;
        },
        attributes: {

        }
    });
    return TableView;
});
