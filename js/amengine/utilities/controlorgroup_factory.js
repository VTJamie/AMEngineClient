/*global $, define, require*/

define(['controlfactory', 'groupfactory'], function (controlFactory, groupFactory) {
    "use strict";
    var C = {
        GROUP_TYPE: "GROUP_TYPE"
    };
    return function (model) {
        if (model.get(C.GROUP_TYPE) !== undefined) {
            return groupFactory(model);
        } else {
            return controlFactory(model);
        }
    };
});
