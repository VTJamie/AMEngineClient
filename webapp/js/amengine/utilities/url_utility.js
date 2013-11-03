/*global $, define, require, window*/

define(['jquery'], function ($) {
    "use strict";
    var URLUtility = function () {
        $.extend(this, {
            getBaseURL: function () {
                if(window.location.href.indexOf('localhost') > -1) {
                    return "http://localhost:8080/ServletProxy/aminterfaces";
                } else {
                    return window.location.href;
                }
            }
        });
    };

    return new URLUtility();
});
