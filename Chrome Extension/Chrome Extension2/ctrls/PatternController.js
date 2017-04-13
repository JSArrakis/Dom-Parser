app.controller('PatternController', function ($scope, $location, $routeParams, $rootScope) {


    $scope.Pattern = null;

    init();

    function init() {
        angular.forEach(patterns, function (Pattern) {
            if (Pattern.ID == $routeParams.PatternID) { $scope.Pattern = Pattern; }
        });
    }


    $scope.AddUrlPattern = function (Path, NewURLPattern) {
        if ($rootScope.ValidateRegEx(NewURLPattern, false)) {
            var idx = Path.UrlPatterns.indexOf(NewURLPattern);
            if (idx < 0) {
                "".match(NewURLPattern);
                Path.UrlPatterns.push(NewURLPattern);
                NewURLPattern = "";
                return true;
            }
        }
        return false;
    };

    $scope.RemoveUrlPattern = function (Path, UrlPattern) {

        var idx = Path.UrlPatterns.indexOf(UrlPattern);

        if (idx >= 0) { Path.UrlPatterns.splice(idx, 1); return true;}
        return false;
    };



    $scope.RemoveQualifierPattern = function (Layout, Qualifier) {

        var idx = Layout.Qualifiers.indexOf(Qualifier);

        if (idx >= 0) { Layout.Qualifiers.splice(idx, 1); return true; }
        return false;
    };



    $scope.AddQualifierPattern = function (Layout, Qualifier) {
        if ($scope.ValidateQualifierPattern(Layout, Qualifier)) {
            Layout.Qualifiers.push(Qualifier);
            $scope.$apply();
            Qualifier = { Selector: '', ValidationType: 'Exists', Operand: '=', Value: 1 };
            //Qualifier.Selector = '';
            //$scope.qualifier = { Selector: '', ValidationType: 'Exists', Operand: '=', Value: 1 };
            return true;
        }
        return false;
    };

    $scope.ValidateQualifierPattern = function (Layout, Qualifier) {
        angular.forEach(Layout.Qualifiers, function (qf) { if (qf.Selector == Qualifier.Layout) { return false; } });
        
        if ($rootScope.ValidateRegEx(Qualifier.Selector, false)) {
            if (Qualifier.ValidationType == 'Quantity') {
                if (Qualifier.Value.match(/^([\d]*)$/)) {
                    return true;
                }
            }
            else { return true; }
        }
        return false;
    };
});
