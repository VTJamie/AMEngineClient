/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'hbs!dialogtemplate', 'factory', 'controlviewcollection', 'pagecontainer', 'app', 'pageresponsebodymodel', 'pageview', 'pagecollection'], function ($, jqM, Backbone, Template, runFactory, ControlViewCollection, PageContainer, App, PageResponseBodyModel, PageView, PageCollection) {
    "use strict";
    var constants = {
            RESPONSE_BODY: "RESPONSE_BODY",
            ROOT_OBJECT: "ROOT_OBJECT",
            MENU_ARRAY: "MENU_ARRAY"
        },
        DialogView = PageView.extend({
            template: Template,
            render: function () {
                PageContainer.prototype.render.apply(this, arguments);
                var that = this,
                    $content =  this.getContent();

                ControlViewCollection.setCurrentInstance(this.controlcollection);
                ControlViewCollection.getCurrentInstance().reset();

                $content.append(runFactory(that.model.get(constants.RESPONSE_BODY).get(constants.ROOT_OBJECT)));
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
            }),
            events: $.extend({}, PageView.prototype.events, {
                'click :jqmData(icon=delete)': 'goBack'
            }),
            goBack: function (e) {
                if (PageCollection.length > 0) {
                    $.mobile.changePage($(PageCollection.pop().get("page")));
                } else {
                    window.history.back();
                }
                if (e) {
                    e.preventDefault();
                }
                return false;
            }
        });
    return DialogView;
});
