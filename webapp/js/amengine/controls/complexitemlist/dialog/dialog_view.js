/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'hbs!dialogtemplate', 'factory', 'controlviewcollection', 'pagecontainer', 'app', 'pageresponsebodymodel', 'pageview'], function ($, jqM, Backbone, Template, runFactory, ControlViewCollection, PageContainer, App, PageResponseBodyModel, PageView) {
    "use strict";
    var constants = {
        RESPONSE_BODY: "RESPONSE_BODY",
        ROOT_OBJECT: "ROOT_OBJECT",
        MENU_ARRAY: "MENU_ARRAY"
    }, DialogView = PageView.extend({
        template: Template,
        render: function () {
            PageContainer.prototype.render.apply(this, arguments);
            var that = this,
            $content =  this.getContent(),
            $header = this.getHeader();

            ControlViewCollection.setCurrentInstance(this.controlcollection);
            ControlViewCollection.getCurrentInstance().reset();

            $content.append(runFactory(that.responseobject.get(constants.RESPONSE_BODY).get(constants.ROOT_OBJECT)));
            return this.el;
        },
        getHeader: function () {
            return this.$el.find('> :jqmData(role=header)');
        },
        getContent: function () {
            return this.$el.find('> :jqmData(role=content)');
        },
        getFooter: function () {
            return this.$el.find('> :jqmData(role=footer)');
        },
        attributes: $.extend({}, PageView.prototype.attributes, {
            'class': "type-interior",
            'data-role': 'dialog',
            'role': 'dialog'
        })
    });
    return DialogView;
});
