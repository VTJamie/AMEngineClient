/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'hbs!pagetemplate', 'factory', 'controlviewcollection', 'pagemenuview', 'pagecontainer', 'menuview', 'app'], function ($, jqM, Backbone, Template, runFactory, ControlViewCollection, PageMenuView, PageContainer, MenuView, App) {
    "use strict";
    var constants = {
        RESPONSE_BODY: "RESPONSE_BODY",
        ROOT_OBJECT: "ROOT_OBJECT",
        MENU_ARRAY: "MENU_ARRAY"
    }, PageView = PageContainer.extend({
        initialize: function(options) {
            PageContainer.prototype.initialize.apply(this, arguments);
            this.responseobject = options.model;
            this.controlcollection = new ControlViewCollection();
            App.vent.on('loadactivecontrols.amengine', this.loadActiveControls, this);
        },
        loadActiveControls: function () {
            if (this.$el.closest('.ui-page-active').size() > 0) {
                debug.log('Loading Controls', this);
                ControlViewCollection.setCurrentInstance(this.controlcollection);
            }
        },
        template: Template,
        render: function () {
            PageContainer.prototype.render.apply(this, arguments);
            var that = this,
            $content =  this.getContent(),
            $menu = this.getMenu(),
            $header = this.getHeader(),
            pagemenuarray = that.responseobject.get(constants.RESPONSE_BODY).get(constants.MENU_ARRAY);

            $menu.append(new MenuView().render());
            ControlViewCollection.setCurrentInstance(this.controlcollection);
            ControlViewCollection.getCurrentInstance().reset();

            if(pagemenuarray !== undefined) {
                debug.log("Page Menu", pagemenuarray);
                $header.append(new PageMenuView ({
                    model: pagemenuarray
                }).render());
            }
            $content.append(runFactory(that.responseobject.get(constants.RESPONSE_BODY).get(constants.ROOT_OBJECT)));
            return this.el;
        },
        events: $.extend({
            'tap #panel-toggle': 'panelToggle'
        }, PageContainer.prototype.events),

        panelToggle: function(e) {
            this.getMenu().panel().panel('open');
            e.preventDefault();
            return false;
        },
        getHeader: function () {
            return this.$el.find('> :jqmData(role=header)');
        },
        getMenu: function () {
            return this.$el.find('> :jqmData(role=panel)');
        },
        getContent: function () {
            return this.$el.find('> :jqmData(role=content)');
        },
        getFooter: function () {
            return this.$el.find('> :jqmData(role=footer)');
        },
        attributes: $.extend({
            'class': "type-interior"
        }, PageContainer.prototype.attributes)
    });
    return PageView;
});
