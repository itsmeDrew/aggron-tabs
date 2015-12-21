(function(define) {
  'use strict';

  define(
    [
      'jquery',
      'aggronTabs'
    ],
    function ($) {
      init();

      function init() {
        $('.js-tabs').aggronTabs();
      }

    }
  );
})(window.define);
