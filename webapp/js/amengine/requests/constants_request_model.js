/*global $, define, require*/

define(['backbone', 'urlutility'], function (Backbone, URLUtility) {
	"use strict";
	var C = {
		REQUEST_TYPE_IDENTIFIER : "r-1",
		REQUEST_TYPE_FIELD_CONSTANTS : "RC",
		CONSTANTS : "constants"		
	}, ConstantsRequestModel = Backbone.Model.extend({
		url: URLUtility.getBaseURL(),
		parse : function (data) {			
			return data[C.CONSTANTS];
		},
		request : function (success) {			
			var dataobject = {};
			dataobject[C.REQUEST_TYPE_IDENTIFIER] = C.REQUEST_TYPE_FIELD_CONSTANTS;
			this.fetch({
				data : dataobject,
				success : success,
				type: "POST"
			});
		}
	});

	return new ConstantsRequestModel ();
});
