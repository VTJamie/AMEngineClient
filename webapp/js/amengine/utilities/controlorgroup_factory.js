/*global $, define, require*/

define(['controlfactory', 'groupfactory'], function (controlFactory, groupFactory) {
    "use strict";
    var C = {
        GROUP_TYPE: "GROUP_TYPE"
    };
    return function (model) {
        var returnvalue;
        if (model.get(C.GROUP_TYPE) !== undefined) {
            returnvalue = groupFactory(model);
        } else {
            returnvalue = controlFactory(model);
        }
        return returnvalue;
    };
});
