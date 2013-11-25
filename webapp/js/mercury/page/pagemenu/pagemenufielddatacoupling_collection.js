/*global $, define, require*/

define(['backbone', 'pagemenufielddatacouplingmodel'], function (Backbone, PageMenuFieldDataCouplingModel) {
    "use strict";
    var PageMenuFieldDataCouplingCollection = Backbone.Collection.extend({
        model: function (attrs, options) {
            PageMenuFieldDataCouplingModel = require('pagemenufielddatacouplingmodel');
            return new PageMenuFieldDataCouplingModel(attrs, options);
        }
    });

    return PageMenuFieldDataCouplingCollection;
});
