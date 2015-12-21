'use strict';

;(function ($, window, document, undefined) {

    var pluginName = "aggronTabs",
        defaults = {
            effect: 'fade'
        };

    function Plugin(element, options) {
        this.$elem = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this.pluginName = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {
          var _activeClass = 'active';
          var vm = this;
          var $tabsEl = vm.$elem;
          var $nav = vm.$elem.find('ul');
          var $links = $nav.children().find('a');
          var $firstLink = $nav.children('li:first-child').find('a');
          var $tabsContainer = $tabsEl.find('.tabs-content');
          var $firstTabHeight = $tabsContainer.find('div:first').height();
          var $allTabs = $tabsContainer.find('div');

          // set first tab active
          vm.setContainerHeight($tabsContainer, $firstTabHeight);
          vm.setTabActive($tabsEl, $firstLink, _activeClass);

          // on click - remove current active - set new active
          $links.bind('click',{myOptions: vm.options}, function(e) {
            e.preventDefault();

            var $this = $(this);
            var $tabHeight = $tabsEl.find('div' + $this.attr('href')).height();
            var effect = e.data.myOptions.effect;

            // add transition
            $tabsContainer.addClass('transition');

            // remove active from links and divs
            $links.removeClass(_activeClass);
            $tabsEl.find('.tabs-content').children('div').removeClass(_activeClass);

            // make new active
            vm.setTabActive($tabsEl, $this, _activeClass);
            vm.setContainerHeight($tabsContainer, $tabHeight);

            // set effect
            if (effect === 'fade') {
              $allTabs.removeClass('fade-in').addClass('animate').addClass('fade-out');
              vm.setTabActive($tabsEl, $this, 'fade-in');
            } else if (effect === 'scale') {
              $allTabs.removeClass('scale-in').addClass('animate').addClass('scale-out');
              vm.setTabActive($tabsEl, $this, 'scale-in');
            }

          });

        },

        setTabActive: function (block, el, activeClass) {
          block.find('div' + el.attr('href')).addClass(activeClass);
          el.addClass(activeClass);
        },

        setContainerHeight: function (container, height) {
          container.css('height', height + 'px');
        }
    };

    // prevent multiple calls
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            new Plugin(this, options);
        });
    };

})($, window, document);
