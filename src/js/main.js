'use strict';

require.config({
  paths: {
    almond: '../../bower_components/almond/almond',
    jquery: '../../bower_components/jquery/dist/jquery',
    aggronTabs: 'aggron-tabs'
  },
  shim: {
    aggronTabs: [ 'jquery' ]
  },
  deps: [
    'app'
  ]
});
