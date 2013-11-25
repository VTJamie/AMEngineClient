/*global $, define, require*/

define(['backbone'], function (Backbone) {
    "use strict";
    var ControlViewModel = Backbone.Model.extend({
        defaults: {
            view: undefined
        }
    });

    return ControlViewModel;
});
