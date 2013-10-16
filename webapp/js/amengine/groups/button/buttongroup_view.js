/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'factory', 'hbs!buttongrouptemplate'], function ($, jqM, Backbone, runFactory, Template) {
    "use strict";
    var C = {
        CONTROL_ARRAY: "CONTROL_ARRAY"
    }, ButtonGroupView = Backbone.View.extend({
        initialize: function (options) {
            if ( typeof options !== "undefined") {
                this.model = options.model;
            }
        },
        template: Template,
        render: function () {
            this.$el.empty().append(this.template(this.model.toJSON()));
            var controlarray = this.model.get(C.CONTROL_ARRAY);
            for (var idx = 0; idx < controlarray.length; idx++) {
                var newitem = runFactory(controlarray.at(idx));
                this.$el.append(newitem);
            }
            this.$el.trigger("create");
            return this.el;
        },
        attributes: {
            'data-role': 'controlgroup',
            'data-type': 'horizontal',
            'class': 'amengine-buttongroup'
        }
    });
    return ButtonGroupView;
});
