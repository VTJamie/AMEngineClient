/*global $, define, require*/

define(['jquery', 'backbone', 'constantsrequestmodel', 'baserequestmodel'], function ($, Backbone, CM, BaseRequestModel) {
	
	"use strict";
	var C = {
		RESPONSE_TYPE_IDENTIFIER : "RESPONSE_TYPE_IDENTIFIER"

		//	PERSIST: "PERSIST"
	};

	//M[C.PERSIST] = PersistModel;

	var BaseFieldRequestModel = BaseRequestModel.extend({
		C : $.extend(C, BaseRequestModel.prototype.C)
	});

	return BaseFieldRequestModel;
});
