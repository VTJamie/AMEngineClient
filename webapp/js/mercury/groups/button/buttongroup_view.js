/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'hbs!buttongrouptemplate'], function ($, jqM, Backbone, Template) {
    "use strict";
    var C = {
            CONTROL_ARRAY: "CONTROL_ARRAY"
        },
        ButtonGroupView = Backbone.View.extend({
            initialize: function (options) {
                if (options !== undefined) {
                    this.model = options.model;
                }
            },
            template: Template,
            render: function () {
                var idx,
                    newitem,
                    controlarray,
                    runFactory = require('factory');
                this.$el.empty().append(this.template(this.model.toJSON()));
                controlarray = this.model.get(C.CONTROL_ARRAY);
                for (idx = 0; idx < controlarray.length; idx += 1) {
                    newitem = runFactory(controlarray.at(idx));
                    this.$el.append(newitem);
                }
                this.$el.trigger("create");
                return this.el;
            },
            attributes: {
                'data-role': 'controlgroup',
                'data-type': 'horizontal',
                'class': 'mercury-buttongroup'
            }
        });
    return ButtonGroupView;
});
