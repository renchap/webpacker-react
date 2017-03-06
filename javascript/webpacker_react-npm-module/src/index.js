import React from 'react'
import ReactDOM from 'react-dom'
import { intersection, keys, assign, omit } from 'lodash'
import ujs from './ujs'

const CLASS_ATTRIBUTE_NAME = 'data-react-class'
const PROPS_ATTRIBUTE_NAME = 'data-react-props'

const WebpackerReact = {
  registeredComponents: {},
  wrapForHMR: null,

  render(node, component) {
    const propsJson = node.getAttribute(PROPS_ATTRIBUTE_NAME)
    const props = propsJson && JSON.parse(propsJson)

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
      console.warn('webpacker-react: renderOnHMR called but not elements not wrapped for HMR')
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

  registerComponents(components) {
    const collisions = intersection(keys(this.registeredComponents), keys(components))
    if (collisions.length > 0) {
      console.error(`webpacker-react: can not register components. Following components are already registered: ${collisions}`)
    }

    assign(this.registeredComponents, omit(components, collisions))
    return true
  },

  unmountComponents() {
    const mounted = document.querySelectorAll(`[${CLASS_ATTRIBUTE_NAME}]`)
    for (let i = 0; i < mounted.length; i += 1) {
      ReactDOM.unmountComponentAtNode(mounted[i])
    }
  },

  mountComponents() {
    const registeredComponents = this.registeredComponents
    const toMount = document.querySelectorAll(`[${CLASS_ATTRIBUTE_NAME}]`)

    for (let i = 0; i < toMount.length; i += 1) {
      const node = toMount[i]
      const className = node.getAttribute(CLASS_ATTRIBUTE_NAME)
      const component = registeredComponents[className]

      if (component) {
        this.render(node, component)
      } else {
        console.error(`webpacker-react: cant render a component that has not been registered: ${className}`)
      }
    }
  },

  setup(components = {}) {
    this.registerComponents(components)
    if (typeof window.WebpackerReact !== 'undefined') return
    window.WebpackerReact = this
    ujs.setup(this.mountComponents.bind(this), this.unmountComponents.bind(this))
  }
}

export default WebpackerReact
