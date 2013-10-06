/*global $, define, require*/

define(['jquery', 'jquerymobile', 'backbone', 'marionette'], function ($, jqMobile, Backbone, Marionette) {
	"use strict";
	
	var Router = Backbone.Marionette.AppRouter.extend({
		
		initialize : function (options) {			
			// Matches /117-a/b/c/open, passing "117-a/b/c" to this.open			
			this.route(/^([%a-zA-Z0-9]+)((?:\/[%a-zA-Z0-9\-]+\/[%a-zA-Z0-9\-]+)*)$/, "openPage_OpenPage", options.controller.openPage_OpenPage);
		},
		appRoutes : {
			'' : 'openPage_LandingPage'
		}
	});
	return Router;
});
