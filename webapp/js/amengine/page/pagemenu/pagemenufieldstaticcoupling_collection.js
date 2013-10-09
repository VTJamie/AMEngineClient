/*global $, define, require*/

define(['backbone', 'pagemenufieldstaticcouplingmodel'], function (Backbone, PageMenuFieldStaticCouplingModel) {

    var PageMenuFieldStaticCouplingCollection = Backbone.Collection.extend({
        model: function(attrs, options){      
            PageMenuFieldStaticCouplingModel = require('pagemenufieldstaticcouplingmodel');
            return new PageMenuFieldStaticCouplingModel(attrs, options);
        }
    });

    return PageMenuFieldStaticCouplingCollection;
});
