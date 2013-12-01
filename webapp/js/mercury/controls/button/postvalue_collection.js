/*global $, define, require*/

define(['backbone', 'postvaluemodel'], function (Backbone, PostValueModel) {
    "use strict";
    var PostValueCollection = Backbone.Collection.extend({
        model: PostValueModel
    });

    return PostValueCollection;
});
