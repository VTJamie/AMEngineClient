define(['jquery', 'angular', 'angular-route'], function ($, angular) {
    "use strict";
    var services = angular.module('routeResolverServices', ['ngRoute']).
        provider('routeResolver', function () {
            var that = this;
            $.extend(this, {
                $get: function () {
                    return this;
                },
                routeConfig: function () {
                    var viewsDirectory = 'js/mercuryangular/pages/',
                        controllersDirectory = 'js/mercuryangular/pages/',

                    setBaseDirectories = function (viewsDir, controllersDir) {
                        viewsDirectory = viewsDir;
                        controllersDirectory = controllersDir;
                    },

                    getViewsDirectory = function () {
                        return viewsDirectory;
                    },

                    getControllersDirectory = function () {
                        return controllersDirectory;
                    };

                    return {
                        setBaseDirectories: setBaseDirectories,
                        getControllersDirectory: getControllersDirectory,
                        getViewsDirectory: getViewsDirectory
                    };
                }(),
                route: function (routeConfig) {

                    var resolve = function (baseName) {

                        var routeDef = {};

                        routeDef.templateUrl = that.routeConfig.getViewsDirectory() + baseName.toLowerCase() + '_template.html';
                        routeDef.controller = baseName.replace('/', '_') + '_controller';

                        routeDef.resolve = {
                            load: ['$q', '$rootScope', function ($q, $rootScope) {
                                var dependencies = [that.routeConfig.getControllersDirectory() + baseName.toLowerCase() + '_controller.js'];
                                return resolveDependencies($q, $rootScope, dependencies);
                            }]
                        };

                        return routeDef;
                    },

                    resolveDependencies = function ($q, $rootScope, dependencies) {
                        var defer = $q.defer();
                        require(dependencies, function () {
                            defer.resolve();
                            $rootScope.$apply()
                        });

                        return defer.promise;
                    };

                    return {
                        resolve: resolve
                    }
                }(this.routeConfig)
            });
        });

});
