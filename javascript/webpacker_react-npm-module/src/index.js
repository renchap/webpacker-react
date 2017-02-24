import React from 'react'
import ReactDOM from 'react-dom'

const CLASS_ATTRIBUTE_NAME = 'data-react-class'
const PROPS_ATTRIBUTE_NAME = 'data-react-props'

const WebpackerReact = {
  eventsRegistered: false,
  registeredComponents: {},
  wrapForHMR: null,

  ujs: {
    handleEvent(eventName, callback) {
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
  },

  render: function (node, component) {
    var propsJson = node.getAttribute(PROPS_ATTRIBUTE_NAME)
    var props = propsJson && JSON.parse(propsJson)

    let reactElement = React.createElement(component, props)
    if (this.wrapForHMR) {
      reactElement = this.wrapForHMR(reactElement)
    }
    ReactDOM.render(reactElement, node)
  },

  renderOnHMR(component) {
    const name = component.name

    this.registeredComponents[name] = component

    if (!this.wrapForHMR) {
      console.warn('webpack-react: renderOnHMR called but not elements not wrapped for HMR')
    }

    const toMount = document.querySelectorAll(`[${CLASS_ATTRIBUTE_NAME}=${name}]`)
    for (let i = 0; i < toMount.length; i += 1) {
      const node = toMount[i]

      this.render(node, component)
    }
  },

  registerWrapForHMR(wrapForHMR) {
    this.wrapForHMR = wrapForHMR
  },

  register(component, options) {
    var name = component.name || (options !== undefined && options.as);

    console.log("Registering component: " + name)

    if (!name) {
      throw "Could not determine component name. Probably it's a functional component. " +
      "Please declare component name by passing an 'as' parameter: " +
      "register(Component,  {as: 'Component'})"
    }

    if (this.registeredComponents[name]) {
      console.warn(`webpacker-react: Cant register component, another one with this name is already registered: ${name}`)
      return false
    }

    this.registeredComponents[name] = component
    return true
  },

  mountComponents() {
    var registeredComponents = this.registeredComponents
    var toMount = document.querySelectorAll('[' + CLASS_ATTRIBUTE_NAME + ']')

    for (var i = 0; i < toMount.length; ++i) {
      var node = toMount[i]
      var className = node.getAttribute(CLASS_ATTRIBUTE_NAME)
      var component = registeredComponents[className]

      if (component) {
        this.render(node, component)
      } else {
        console.error('webpacker-react: cant render a component that has not been registered: ' + className)
      }
    }
  },

  unmountComponents() {
    var mounted = document.querySelectorAll('[' + CLASS_ATTRIBUTE_NAME + ']')

    for (var i = 0; i < mounted.length; ++i) {
      var node = mounted[i]

      ReactDOM.unmountComponentAtNode(node);
    }
  },

  addEventEventhandlers() {
    if (this.eventsRegistered == true) {
      console.warn("webpacker-react: events have already been registered")
      return false
    }

    this.ujs.setup(this.mountComponents.bind(this), this.unmountComponents.bind(this));

    this.eventsRegistered = true
    return true
  }
}

WebpackerReact.addEventEventhandlers()

export default WebpackerReact
