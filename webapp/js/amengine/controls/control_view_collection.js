/*global $, define, require*/

define(['jquery', 'backbone', 'constantsrequestmodel', 'controlviewmodel'], function ($, Backbone, CM, ControlViewModel) {
	"use strict";

	var C ={
		FIELD_PREFIX: "FIELD_PREFIX"	
	},
	ControlViewCollection = Backbone.Collection.extend({
		model : ControlViewModel,
		getFieldValues : function () {
			var valueobject = {};
			this.each(function (model) {				
				$.extend(valueobject, model.get("view").getValue());
			});
			for(var p in valueobject){
				valueobject[CM.get(C.FIELD_PREFIX) + p] = valueobject[p];
				delete valueobject[p];
			}
			return valueobject;
		}
	}), currentpagecollection;

	ControlViewCollection.getCurrentInstance = function () {
		if (currentpagecollection === undefined) {
			currentpagecollection = new ControlViewCollection();
		}
		return currentpagecollection;
	};
	return ControlViewCollection;
});
