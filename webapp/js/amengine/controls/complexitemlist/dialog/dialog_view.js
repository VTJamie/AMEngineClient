/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'hbs!dialogtemplate', 'factory', 'controlviewcollection', 'pagecontainer'], function ($, jqM, Backbone, Template, Factory, ControlViewCollection, PageContainer) {
    "use strict";
    var constants = {
        RESPONSE_BODY: "RESPONSE_BODY",
        ROOT_OBJECT: "ROOT_OBJECT",
        MENU_ARRAY: "MENU_ARRAY"
    }, DialogView = PageContainer.extend({
        initialize: function(options) {
            PageContainer.prototype.initialize.apply(this, arguments);
            this.responseobject = options.model;
        },
        template: Template,
        render: function () {
            PageContainer.prototype.render.apply(this, arguments);
            var that = this,
            $content =  this.getContent(),
            $header = this.getHeader();

            ControlViewCollection.getCurrentInstance().reset();

            $content.append(Factory(that.responseobject.get(constants.RESPONSE_BODY).get(constants.ROOT_OBJECT)));
            return this.el;
        },
        events: $.extend({}, PageContainer.prototype.events, {

        }),

        getHeader: function () {
            return this.$el.find('> :jqmData(role=header)');
        },
        getContent: function () {
            return this.$el.find('> :jqmData(role=content)');
        },
        getFooter: function () {
            return this.$el.find('> :jqmData(role=footer)');
        },
        attributes: $.extend({}, PageContainer.prototype.attributes, {
            'class': "type-interior",
            'data-role': 'dialog',
            'role': 'dialog'
        })
    });
    return DialogView;
});
