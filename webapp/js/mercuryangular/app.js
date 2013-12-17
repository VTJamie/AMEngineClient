define(['jquery', 'angular', 'angular-route', 'routeResolverServices'], function ($, angular) {
    "use strict";
    var app = angular.module('testApp', ['ngRoute', 'routeResolverServices']);
    app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider',
        function ($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {

            //Change default views and controllers directory using the following:
            //routeResolverProvider.routeConfig.setBaseDirectories('/app/views', '/app/controllers');
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;        charset=UTF-8';
            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            //Define routes - controllers will be loaded dynamically
            var route = routeResolverProvider.route;

            $routeProvider
                .when('/home', route.resolve('home'))
                .when('/home/home', route.resolve('home'))
                .otherwise({ redirectTo: '/home' });

            app.register.directive('snapJs', function() {
                return {
                    restrict: 'A',
                    transclude: false,
                    link: function(scope, element, attrs) {
                        var mysnap = new Snap({
                            element: angular.element('.snap-content')[0],
                            disable: 'right'
                        });

                        element.on('click', function (e) {
                            if (mysnap.state().state === "left" ) {
                                mysnap.close();
                            } else {
                                mysnap.open('left');
                            }
                        });
                    }
                };
            });

            app.register.service('urlService', ['$rootScope', function ($rootScope) {
                return {
                    baseUrl: "http://localhost:8080/ServletProxy/aminterfaces"
                };
            }]);

            app.register.service('testService', ['$http', 'urlService', function ($http, urlService) {
                var Service = function () {
                    this.request = function (success) {
                        $http.post(urlService.baseUrl, $.param({"r-1": "RC"})).success(success);
                    };
                    return this;
                };

                return new Service();
            }]);
        }
    ]);

    return app;
});