/*global angular*/
(function () {
    'use strict';

    /* @ngInject */
    function htSidebar(Sidebar) {

        var directive;

        function link(scope, element) {
            var $sidebarInner,
                $dropdownElement;

            function dropdown(e) {
                var dropClass = 'dropy';
                e.preventDefault();
                if (!$dropdownElement.hasClass(dropClass)) {
                    $sidebarInner.slideDown(350, scope.whenDoneAnimating);
                    $dropdownElement.addClass(dropClass);
                } else if ($dropdownElement.hasClass(dropClass)) {
                    $dropdownElement.removeClass(dropClass);
                    $sidebarInner.slideUp(350, scope.whenDoneAnimating);
                }
            }

            $sidebarInner = element.find('.sidebar-inner');
            $dropdownElement = element.find('.sidebar-dropdown a');
            element.addClass('sidebar');
            $dropdownElement.click(dropdown);

        }


        // Opens and closes the sidebar menu.
        // Usage:
        //  <div ht-sidebar">
        //  <div ht-sidebar whenDoneAnimating="vm.sidebarReady()">
        // Creates:
        //  <div ht-sidebar class="sidebar">

        directive = {
            controller: Sidebar,
            bindToController: true,
            conrollerAs: 'vm',
            link: link,
            restrict: 'EA',
            scope: {
                whenDoneAnimating: '&?'
            }
        };
        return directive;

    }

    angular
        .module('app.layout')
        .directive('htSidebar', htSidebar);

    htSidebar.$inject = ['Sidebar'];

}());
