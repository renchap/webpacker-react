const ujs = {
  handleEvent: function(eventName, callback) {
    // jQuery is optional. Use it to support legacy browsers.
    var $ = (typeof window.jQuery !== 'undefined') && window.jQuery;

    if ($) {
      $(document).on(eventName, callback);
    } else {
      document.addEventListener(eventName, callback);
    }
  },

  setup: function (onMount, onUnmount) {
    var $ = (typeof window.jQuery !== 'undefined') && window.jQuery;
    // Detect which kind of events to set up:
    if (typeof Turbolinks !== 'undefined' && Turbolinks.supported) {
      if (typeof Turbolinks.EVENTS !== 'undefined') {
        // Turbolinks.EVENTS is in classic version 2.4.0+
        this.turbolinksClassic(onMount, onUnmount);
      } else if (typeof Turbolinks.controller !== "undefined") {
        // Turbolinks.controller is in version 5+
        this.turbolinks5(onMount, onUnmount);
      } else {
        // ReactRailsUJS.TurbolinksClassicDeprecated.setup();
        this.turbolinksClassicDeprecated(onMount, onUnmount);
      }
    } else if ($ && typeof $.pjax === 'function') {
      this.pjax(onMount, onUnmount);
    } else {
      this.native(onMount);
    }
  },

  turbolinks5: function (onMount, onUnmount) {
    this.handleEvent('turbolinks:load', onMount);
    this.handleEvent('turbolinks:before-render', onUnmount);
  },

  turbolinksClassic: function (onMount, onUnmount) {
    this.handleEvent(Turbolinks.EVENTS.CHANGE, onMount);
    this.handleEvent(Turbolinks.EVENTS.BEFORE_UNLOAD, onUnmount);
  },

  turbolinksClassicDeprecated: function (onMount, onUnmount) {
    // Before Turbolinks 2.4.0, Turbolinks didn't
    // have named events and didn't have a before-unload event.
    // Also, it didn't work with the Turbolinks cache, see
    // https://github.com/reactjs/react-rails/issues/87
    Turbolinks.pagesCached(0);
    this.handleEvent('page:change', onMount);
    this.handleEvent('page:receive', onUnmount);
  },

  pjax: function (onMount, onUnmount) {
    this.handleEvent('ready', onMount);
    this.handleEvent('pjax:end', onMount);
    this.handleEvent('pjax:beforeReplace', onUnmount);
  },

  native: function (onMount) {
    var $ = (typeof window.jQuery !== 'undefined') && window.jQuery;

    if ($) {
      $(function () {
        onMount()
      });
    } else if ('addEventListener' in window) {
      document.addEventListener('DOMContentLoaded', function () {
        onMount()
      });
    } else {
      // add support to IE8 without jQuery
      window.attachEvent('onload', function () {
        onMount()
      });
    }
  }
}

export default ujs;