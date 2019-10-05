angular.module('app.compile', []).directive('compile', ['$compile', function ($compile) 
{
    return function(scope, element, attrs) 
    {
        scope.$watch
        (
            function(scope) 
            {
                return scope.$eval(attrs.compile);
            },
            function(value) 
            {
                element.html(value);
                $compile(element.contents())(scope);
            }
        );
    };
}]);