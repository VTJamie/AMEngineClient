/*global $, define, require*/

define(['backbone', 'pagemenufielddatacouplingmodel'], function (Backbone, PageMenuFieldDataCouplingModel) {

    var PageMenuFieldDataCouplingCollection = Backbone.Collection.extend({
        model: function(attrs, options){      
        	PageMenuFieldDataCouplingModel = require('pagemenufielddatacouplingmodel');   
        	return new PageMenuFieldDataCouplingModel(attrs, options);
    	}
    });

    return PageMenuFieldDataCouplingCollection;
});
