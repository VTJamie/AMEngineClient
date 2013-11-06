/*global window */
define([
        'Handlebars', 'underscore'
    ], function (Handlebars, _) {
        "use strict";

        function pad(num, size) {
            var s = num+"";
            while (s.length < size) s = "0" + s;
            return s;
        }
        Handlebars.registerHelper('date', function (value, options) {
            var datevalue = new Date(value);
            return  [pad(datevalue.getFullYear(), 4), "-", pad(datevalue.getMonth()+1, 2), "-", pad(datevalue.getDate(), 2)].join("");
        });

        Handlebars.registerHelper('safestring', function (value, options) {
            new Handlebars.SafeString(value);
        });

        Handlebars.registerHelper('wsUrl', function (value, options) {
            return require('urlutility').getBaseURL();
        });


        Handlebars.registerHelper('partial', function partial(template, context, options) {
            var f = Handlebars.partials[template];
            if (!_.isFunction(f)) {
                return "";
            }
            return new Handlebars.SafeString(f(context));
        });
        Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

            switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            case '!==':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
            }
            // return options.inverse(this);
        });

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

        Handlebars.registerHelper('urlencode', function (value, options) {
           return encodeURI(value);
        });
        return Handlebars;
    });
