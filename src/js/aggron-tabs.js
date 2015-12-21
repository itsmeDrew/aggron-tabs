;(function ($, window, document, undefined ) {

    var pluginName = "aggronTabs";
        // defaults = {
        //     effect: 'effect'
        // };

    function Plugin( element, options ) {
        this.element = element;
        this.$elem = $(this.element);
        // this.options = $.extend( {}, defaults, options );
        // this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {
          var _activeClass = 'active';
          var tabsEl = this.$elem;
          var $nav = this.$elem.find('ul');
          var $navItems = $nav.children();
          var $links = $navItems.find('a');
          var $firstLink = $nav.children('li:first-child').find('a');
          var $tabsContainer = tabsEl.find('.tabs-content');
          var $firstTabHeight = $tabsContainer.find('div:first').height();

          // set first tab active
          $firstLink.addClass(_activeClass);
          $tabsContainer.css('height', $firstTabHeight + 'px');
          setDivActive(tabsEl, $firstLink, _activeClass);

          // on click - remove current active - set new active
          // {myOptions: this.options} - when adding options
          $links.bind('click', function(e) {
            e.preventDefault();

            var $this = $(this);
            var $tabHeight = tabsEl.find('div' + $this.attr('href')).height();

            // remove active from links and divs
            $links.removeClass(_activeClass);
            tabsEl.find('.tabs-content').children('div').removeClass(_activeClass);

            // make new active
            setDivActive(tabsEl, $this, _activeClass);
            $this.addClass(_activeClass);
            $tabsContainer.css('height', $tabHeight + 'px');

          });

          function setDivActive(block, el, activeClass) {
            block.find('div' + el.attr('href')).addClass(activeClass);
          }

        }
    };

    // prevent multiple calls
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            new Plugin( this, options );
        });
    };

})($, window, document );
