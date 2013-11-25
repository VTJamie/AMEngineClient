/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'basecontrolview', 'hbs!workflowindicatortemplate'], function ($, jqM, Backbone, BaseControlView, Template) {
    "use strict";
    var WorkflowIndicatorView = BaseControlView.extend({
            initialize: function (options) {
                BaseControlView.prototype.initialize.apply(this, arguments);
            },
            template: Template,
            getValue : function () {
                return BaseControlView.prototype.getValue.apply(this, arguments);
            }
        });
    return WorkflowIndicatorView;
});
