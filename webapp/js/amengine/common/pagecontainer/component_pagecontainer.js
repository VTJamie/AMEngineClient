/*global $, require, define, debug, window, navigator */
define(['jquery', 'backbone', 'backbone-jquerymobilepage', 'header', 'footer', 'panelcomponent', 'app'], function ($, Backbone, jqmPage, Header, Footer, PanelView, App) {
    "use strict";
    var PageContainer = jqmPage.extend({
        initialize: function (options) {
          //  this.panelComponent = new PanelView({panelid: 'panel-id'});
          //  this.headerComponent = new Header();
          //  this.footerComponent = new Footer();
            jqmPage.prototype.initialize.apply(this, arguments);
        },
        render: function () {
            if (this.panelComponent !== undefined) {
                this.$el.append(this.panelComponent.render());
            }
            if (this.headerComponent !== undefined) {
                this.$el.append(this.headerComponent.render());
            }
            jqmPage.prototype.render.apply(this, arguments);
            if (this.footerComponent !== undefined) {
                this.$el.append(this.footerComponent.render());
            }
            return this.el;
        },
        panelComponent: undefined,
        headerComponent: undefined,
        footerComponent: undefined,
        events: {
            'pageshow': 'afterjqMInit'
        },
        onShow: function () {
            if ($.mobile.pageContainer) {
                $.mobile.changePage(this.$el);
            }

            if (this.headerComponent !== undefined) {
                this.headerComponent.trigger('view:inDOM');
            }
            this.trigger('view:inDOM');
            if (this.panelComponent !== undefined) {
                this.panelComponent.trigger('view:inDOM');
            }
            if (this.footerComponent !== undefined) {
                this.footerComponent.trigger('view:inDOM');
            }

        },
        afterjqMInit: function () {
            if (this.headerComponent !== undefined) {
                this.headerComponent.trigger('view:afterjqMInit');
            }
            this.trigger('view:afterjqMInit');
            if (this.panelComponent !== undefined) {
                this.panelComponent.trigger('view:afterjqMInit');
            }
            if (this.footerComponent !== undefined) {
                this.footerComponent.trigger('view:afterjqMInit');
            }
        },
        //      template: Template,
        attributes: $.extend({
            'data-theme': 'a'
        }, jqmPage.prototype.attributes)
    });
    return PageContainer;
});
