/*global angular*/
(function () {
    'use strict';

    /* @ngInject */
    function htTopNav() {
        var directive;

        /* @ngInject */
        function TopNavController() {
            var vm = this;
        }

        directive = {
            bindToController: true,
            controller: TopNavController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                tagline: '=',
                title: '='
            },
            templateUrl: 'app/layout/ht-top-nav.html'
        };


        return directive;
    }


    angular
        .module('app.layout')
        .directive('htTopNav', htTopNav);

}());
