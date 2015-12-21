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
        $('#tabs').aggronTabs();
      }

    }
  );
})(window.define);
