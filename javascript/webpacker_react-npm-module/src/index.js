import React from 'react'
import ReactDOM from 'react-dom'
import ujs from './ujs';

const CLASS_ATTRIBUTE_NAME = 'data-react-class'
const PROPS_ATTRIBUTE_NAME = 'data-react-props'

const WebpackerReact = {
  eventsRegistered: false,
  registeredComponents: {},
  wrapForHMR: null,

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
      var node = mounted[i];
      ReactDOM.unmountComponentAtNode(node);
    }
  },

  addEventEventhandlers() {
    if (this.eventsRegistered == true) {
      console.warn("webpacker-react: events have already been registered");
      return false;
    }

    ujs.setup(this.mountComponents.bind(this), this.unmountComponents.bind(this));

    this.eventsRegistered = true;
    return true;
  }
}

WebpackerReact.addEventEventhandlers();

export default WebpackerReact
