/*global $, define, require, window*/

define(['jquery'], function ($) {
    "use strict";
    var URLUtility = function () {
        $.extend(this, {
            getBaseURL: function () {
                var returnvalue;
                if (window.location.href.indexOf('localhost') > -1) {
                    returnvalue = "http://localhost:8080/ServletProxy/aminterfaces";
                } else {
                    returnvalue = window.location.href;
                }
                return returnvalue;
            }
        });
    };

    return new URLUtility();
});
