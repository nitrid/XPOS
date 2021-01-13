
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
}]).directive('langu',['$compile','db','$window','$rootScope', function ($compile,db,$window,$rootScope) 
{
    var directive = {};
    directive.restrict = 'A';

    directive.compile = function(element, attributes) 
    {
        element[0].innerText = db.Language(localStorage.Lang,element[0].innerText);
    }
     
    return directive;
}]);