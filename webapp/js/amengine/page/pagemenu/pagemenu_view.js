/*global $, define, require*/
/*jslint evil: true */
define(['jquery', 'jquerymobile', 'backbone', 'pagemenuitemview', 'hbs!pagemenutemplate', 'app'], function ($, jqM, Backbone, PageMenuItemView, PageMenuTemplate, App) {
    "use strict";
    var PageMenuView = Backbone.View.extend({
            initialize: function (options) {

                this.options = $.extend({}, options);
                this.model = this.options.model;
            },
            template: PageMenuTemplate,
            render: function () {
                var idx,
                    curmodel,
                    curview,
                    $thisul;
                this.$el.empty().html(this.template(this.model.toJSON()));
                $thisul = this.$el.find('> ul');
                for (idx = 0; idx < this.model.length; idx += 1) {
                    curmodel = this.model.at(idx);
                    curview = new PageMenuItemView();
                    curview.model = curmodel;
                    $thisul.append(curview.render());
                }
                this.$el.trigger('create');
                return this.el;
            },
            attributes: {
                'data-role': 'navbar',
                'data-theme': 'c',
                'class': 'ui-bar amengine-nopadding'
            }
        });
    return PageMenuView;
});
