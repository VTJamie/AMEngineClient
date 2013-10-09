/*global $, define, require, window*/

define(['jquery'], function ($) {
    "use strict";
    var URLUtility = function () {
        $.extend(this, {
            getBaseURL: function () {
                return "http://localhost:8080/ServletProxy/aminterfaces";
             //   return window.location.href;
            }
        });
    };

    return new URLUtility();
});
