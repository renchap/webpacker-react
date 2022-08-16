import React from "react"
import ReactDOM from "react-dom"
import ReactDOMClient, { Root } from "react-dom/client"

// import ujs from './ujs'

const CLASS_ATTRIBUTE_NAME = "data-react-class"
const PROPS_ATTRIBUTE_NAME = "data-react-props"

declare global {
  interface Window {
    ReactComponentsRails: typeof ReactComponentsRails
  }
}

const ReactComponentsRails = {
  registeredComponents: {} as { [name: string]: React.ComponentType },
  mountedRoots: [] as Root[],
  ReactDOMClient: undefined as
    | typeof ReactDOM
    | typeof ReactDOMClient
    | undefined,

  render(node: Element, component: React.ComponentType) {
    const propsJson = node.getAttribute(PROPS_ATTRIBUTE_NAME)
    const props = propsJson && JSON.parse(propsJson)

    const reactElement = React.createElement(component, props)

    if (this.ReactDOMClient) {
      if ("createRoot" in this.ReactDOMClient) {
        const root = this.ReactDOMClient.createRoot(node)
        root.render(reactElement)
        this.mountedRoots.push(root)
      } else {
        this.ReactDOMClient.render(reactElement, node)
      }
    }
  },

  registerComponents(components: { [name: string]: React.ComponentType }) {
    const alreadyExisting: string[] = []

    Object.keys(components).forEach((key) => {
      if (this.registeredComponents[key]) alreadyExisting.push(key)
      else {
        const comp = components[key]
        this.registeredComponents[key] = comp
      }
    })

    if (alreadyExisting.length > 0) {
      console.error(
        `react-components-rails: can not register components. Following components are already registered: ${alreadyExisting.join(
          ", "
        )}`
      )
    }

    return true
  },

  unmountComponents() {
    if (this.ReactDOMClient) {
      if ("createRoot" in this.ReactDOMClient) {
        this.mountedRoots.forEach((root) => root.unmount())
        this.mountedRoots = []
      } else {
        const mounted = document.querySelectorAll(`[${CLASS_ATTRIBUTE_NAME}]`)
        for (let i = 0; i < mounted.length; i += 1) {
          this.ReactDOMClient.unmountComponentAtNode(mounted[i])
        }
      }
    }
  },

  mountComponents() {
    const { registeredComponents } = this
    const toMount = document.querySelectorAll(`[${CLASS_ATTRIBUTE_NAME}]`)

    for (let i = 0; i < toMount.length; i += 1) {
      const node = toMount[i]
      const className = node.getAttribute(CLASS_ATTRIBUTE_NAME)

      if (!className) {
        console.error(
          `react-components-rails: no ${CLASS_ATTRIBUTE_NAME} attribute on element: ${node}`
        )
        continue
      }

      const component = registeredComponents[className]

      if (component) {
        if (node.innerHTML.length === 0) this.render(node, component)
      } else {
        console.error(
          `react-components-rails: can not render a component that has not been registered: ${className}`
        )
      }
    }
  },

  setup(components = {}) {
    if (typeof window.ReactComponentsRails === "undefined") {
      window.ReactComponentsRails = this
      // ujs.setup(this.mountComponents.bind(this), this.unmountComponents.bind(this))
    }

    this.loadReactDOMClient().then(() => {
      window.ReactComponentsRails.registerComponents(components)
      window.ReactComponentsRails.mountComponents()
    })
  },

  loadReactDOMClient() {
    return new Promise<void>((resolve) => {
      if (this.ReactDOMClient) resolve()

      import("react-dom/client")
        .then((i) => {
          this.ReactDOMClient = i
          resolve()
        })
        .catch(() => {
          this.ReactDOMClient = ReactDOM
        })
    })
  },
}

export default ReactComponentsRails
