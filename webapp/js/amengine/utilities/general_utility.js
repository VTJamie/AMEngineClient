/*global $, define, require, window*/

define(['jquery'], function ($) {
	"use strict";
	var GeneralUtility = function () {
		$.extend(this, {
			s4: function () {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			},

			guid: function () {
				return this.s4() + this.s4() + '-' + 
				this.s4() + '-' + 
				this.s4() + '-' + 
				this.s4() + '-' + 
				this.s4() + this.s4() + this.s4();
			}
		});
	};

	return new GeneralUtility ();
});
