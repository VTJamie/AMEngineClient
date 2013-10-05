/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'basecontrolview', 'hbs!complexitemlisttemplate'], function (
    $, jqM, Backbone, BaseControlView, Template) {
	"use stric";
    var C = {
        
    },
    ComplexItemListView = BaseControlView.extend({
            initialize: function (options) {
                BaseControlView.prototype.initialize.apply(this, arguments);
                this.template = Template;
            }
    });
    return ComplexItemListView;
});
