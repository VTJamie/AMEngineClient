/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'marionette', 'app', 'landingpagerequestmodel', 'initialpagerequestmodel', 'factory', 'pageview'], function ($, jqMobile, Backbone, Marionette, App, LandingPageRequestModel, InitialPageRequestModel, Factory, PageView) {"use strict";
    var constants = {
        RESPONSE_BODY: "RESPONSE_BODY",
        ROOT_OBJECT: "ROOT_OBJECT",
        SESSION_VALID: "SESSION_VALID"
    }, Controller = Backbone.Marionette.Controller.extend({
        openPage_LandingPage: function () {
//            $.mobile.loading('show', {
//                text: 'Loading next view...',
//                textVisible: true,
//                theme: 'a',
//                html: ""
//            });
            LandingPageRequestModel.request(function (model) {
                App.loadPage(new PageView({model: model}));
                //App.vent.trigger('menu:reload');
            //    $.mobile.loading('hide');
            });
        },
        openPage_OpenPage: function (pagename, pageparams) {
            var splitparamdata = {
                OBJECT_NAME: pagename,
                fields: {}
            }, splitparamstrings = pageparams ? pageparams.split("/") : [];

            for (var idx = 1; idx < splitparamstrings.length - 1; idx += 2) {
                splitparamdata.fields[splitparamstrings[idx]] = splitparamstrings[idx + 1];
            }

//            $.mobile.loading('show', {
//                text: 'Loading next view...',
//                textVisible: true,
//                theme: 'a',
//                html: ""
//            });

            InitialPageRequestModel.request(splitparamdata, function (model) {
                if (model.get(constants.SESSION_VALID)) {
                    debug.log("Loading", model);
                    App.loadPage(new PageView({model: model}));
                }
                else {
                    Backbone.history.navigate('', {trigger: true});
                    debug.log("Failed to Load: " + pagename, splitparamdata);
                }
                //$.mobile.loading('hide');
            });
        }
    });
    return Controller;
});
