var app = angular.module('LayoutBuilder', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', { controller: 'PatternsController', templateUrl: 'Views/Patterns.html' })
        .when('/Pattern/:PatternID', { controller: 'PatternController', templateUrl: 'Views/EditPattern.html' })
        .otherwise({ redirectTo: '/' });
});

app.directive('onClearOnRepeatFinished', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                //scope.qualifier = null;
                console.log(attr);
                //alert('last' + JSON.stringify(element));
                //element = null;
                //$timeout(function () {

                //    scope.$emit('ngRepeatFinished');
                //});
            }
        }
    }
});

app.run(function ($rootScope, $location) {

    $rootScope.Redirect = function (URL) {
        $location.path(URL);
    };

    $rootScope.ValidateRegEx = function (Pattern, AllowEmpty) {
        try {
            if (Pattern !== "" || AllowEmpty == true) { "".match(Pattern); return true; }
        } catch (e) { return false; }
        return false;
    };

});




