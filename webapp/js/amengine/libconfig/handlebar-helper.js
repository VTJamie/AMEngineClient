/*global $, define, require*/
define(['Handlebars'], function (Handlebars) {"use strict";
	Handlebars.registerHelper('repeat', function (numberofiterations, options) {
		var itemarray = options.hash.items.split(","), htmlarray = new Array ();
		for (var idx = 0; idx < numberofiterations; idx++) {
			htmlarray.push(options.fn(itemarray[idx]));
		}
		return htmlarray.join("");
	});

	Handlebars.registerHelper('output', function (value, options) {
		debug.log("Handlebar Parser Output", value);
		return "";
	});

	Handlebars.registerHelper('usearrayindex', function (value, options) {
		return options.fn(value[options.hash.index]);
	});
	
	Handlebars.registerHelper('isEven', function (value, options) {
		if(value % 2 === 0){
			return options.fn(this);	
		}
		else {
			return options.inverse(this);
		}
	});
	
	Handlebars.registerHelper('isOdd', function (value, options) {		
		if(value % 2 !== 0){
			return options.fn(this);	
		}
		else {
			return options.inverse(this);
		}
	});

	Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

		switch (operator) {
			case '==':
				return (v1 == v2) ? options.fn(this) : options.inverse(this);
				break;
			case '===':
				return (v1 === v2) ? options.fn(this) : options.inverse(this);
				break;
			case '!=':
				return (v1 != v2) ? options.fn(this) : options.inverse(this);
				break;
			case '!==':
				return (v1 !== v2) ? options.fn(this) : options.inverse(this);
				break;
			case '<':
				return (v1 < v2) ? options.fn(this) : options.inverse(this);
				break;
			case '<=':
				return (v1 <= v2) ? options.fn(this) : options.inverse(this);
				break;
			case '>':
				return (v1 > v2) ? options.fn(this) : options.inverse(this);
				break;
			case '>=':
				return (v1 >= v2) ? options.fn(this) : options.inverse(this);
				break;
			default:
				return options.inverse(this);
				break;
		}
		//return options.inverse(this);
	});
});
