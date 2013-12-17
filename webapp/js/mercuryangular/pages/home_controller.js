define(['jquery', 'angular', 'app'], function ($, angular, app) {
    "use strict";

    app.register.controller('home_controller', ['$scope', 'testService', function ($scope, testService) {
        $scope.title = 'Heyo';
        testService.request(function(data) {
            $scope.data = data;
            $scope.$$phase || $scope.$digest();
        });

        $scope.appBase = "js/mercuryangular/";
    }]);
});
