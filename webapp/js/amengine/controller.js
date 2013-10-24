/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'marionette', 'app', 'landingpagerequestmodel', 'initialpagerequestmodel', 'factory', 'pageview'], function ($, jqMobile, Backbone, Marionette, App, LandingPageRequestModel, InitialPageRequestModel, runFactory, PageView) {"use strict";

    var constants = {
        RESPONSE_BODY: "RESPONSE_BODY",
        ROOT_OBJECT: "ROOT_OBJECT",
        SESSION_VALID: "SESSION_VALID"
    }, Controller = Backbone.Marionette.Controller.extend({
        openPage_LandingPage: function () {

            App.showLoader();
            LandingPageRequestModel.request(function (model) {
                App.loadPage(new PageView({model: model}));
                 App.hideLoader();
            });
        },
        openPage_OpenPage: function (pagename, pageparams) {
             App.showLoader();
            var splitparamdata = {
                OBJECT_NAME: pagename,
                fields: {},
                },
                splitparamstrings = pageparams ? pageparams.split("/") : [],
                idx;

            for (idx = 1; idx < splitparamstrings.length - 1; idx += 2) {
                splitparamdata.fields[splitparamstrings[idx]] = splitparamstrings[idx + 1];
            }

            InitialPageRequestModel.request(splitparamdata, function (model) {
                if (model.get(constants.SESSION_VALID)) {
                    debug.log("Loading", model);
                    App.loadPage(new PageView({model: model}));
                     App.hideLoader();
                }
                else {
                    debug.log("Failed to Load: ", pagename, pageparams);
                     App.hideLoader();
                    Backbone.history.navigate('', {trigger: true});
                }
            });
        }
    });
    return Controller;
});
