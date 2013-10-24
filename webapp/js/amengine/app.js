/*global $, require, define, debug */
/*jslint nomen: true*/
define(['jquerymobile', 'underscore', 'backbone', 'marionette', 'pagecollection'], function (jqM, _, Backbone, Marionette, PageCollection) {
    "use strict";

    var TheApplication,
        TheApplicationClass = Backbone.Marionette.Application.extend({
            readyForJqM: _.once(function (junk) {
                debug.log('Initializing jQuery Mobile');

                jqM.initializePage();
            }),

            loadPage: function (page) {
                if ($.mobile.pageContainer !== undefined) {
                    $.mobile.pageContainer.append(page.render());
                    if (typeof page.onShow === "function") {
                        page.onShow();
                    }
                    TheApplication.readyForJqM();
                    if (typeof page.afterjqMInit === "function") {
                        page.afterjqMInit();
                    }
                } else {

                    this.bodyRegion.show(page); //page.onShow gets called inside here
                    TheApplication.readyForJqM();
                    if (typeof page.afterjqMInit === "function") {
                        page.afterjqMInit();
                    }
                }
                $('html, body').scrollTop(0);
            }
        });

    TheApplication = new TheApplicationClass();

    debug.setLevel(5);
    TheApplication.addRegions({
        bodyRegion: 'body'
    });

    TheApplication.bodyRegion.on('show', function () {
        TheApplication.readyForJqM();
    });

    $(TheApplication.bodyRegion.el).on('pagehide', function (event, options) {
        if($.mobile.pageContainer.find(".ui-page-active").is('.ui-dialog')) {
            debug.log('save old page', event.target);

            PageCollection.push({page: event.target});
        } else {
            $(event.target).remove();
        }
    });

    TheApplication.showLoader = function () {
       if($.mobile.pageContainer) {
           $.mobile.loading('show', {
               text: 'Loading...',
               textVisible: true,
               theme: 'a',
               html: ""
           });
       }
    };

    TheApplication.hideLoader = function () {
        if($.mobile.pageContainer) {
            $.mobile.loading('hide');
        }
    };


    TheApplication.on('start', function (options) {

        //  TheApplication.readyForJqM();
        this.routesHit = 0;
        // keep count of number of routes handled by your application
        Backbone.history.on('route', function () {
            this.routesHit += 1;
        }, this);
        debug.log('Starting Backbone History');
        Backbone.history.start();
        // Great time to do this

    });

    return TheApplication;

});
/*jslint nomen: false*/
