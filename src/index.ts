import React from "react"
import ReactDOM from "react-dom"
import type ReactDOMClient from "react-dom/client"

// import ujs from './ujs'

const CLASS_ATTRIBUTE_NAME = "data-react-class"
const PROPS_ATTRIBUTE_NAME = "data-react-props"

declare global {
  interface Window {
    ReactComponentsRails: ReactComponentsRails
  }
}

class ReactComponentsRails {
  #registeredComponents = {} as { [name: string]: React.ComponentType }
  #mountedRoots = [] as ReactDOMClient.Root[]
  #ReactDOMClient = undefined as typeof ReactDOMClient | undefined | false

  static getInstance() {
    if (typeof window.ReactComponentsRails === "undefined") {
      const instance = new ReactComponentsRails()
      window.ReactComponentsRails = instance

      // ujs.setup(this.mountComponents.bind(this), this.unmountComponents.bind(this))
    }

    return window.ReactComponentsRails
  }

  private render(node: Element, component: React.ComponentType) {
    const propsJson = node.getAttribute(PROPS_ATTRIBUTE_NAME)
    const props = propsJson && JSON.parse(propsJson)

    const reactElement = React.createElement(component, props)

    if (this.#ReactDOMClient) {
      const root = this.#ReactDOMClient.createRoot(node)
      root.render(reactElement)
      this.#mountedRoots.push(root)
    } else {
      ReactDOM.render(reactElement, node)
    }
  }

  private registerComponents(components: {
    [name: string]: React.ComponentType
  }) {
    const alreadyExisting: string[] = []

    Object.keys(components).forEach((key) => {
      if (this.#registeredComponents[key]) alreadyExisting.push(key)
      else {
        const comp = components[key]
        this.#registeredComponents[key] = comp
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
  }

  // Not used for now, useful for UJS
  // private unmountComponents() {
  //   if (this.#ReactDOMClient) {
  //     this.#mountedRoots.forEach((root) => root.unmount())
  //     this.#mountedRoots = []
  //   } else {
  //     const mounted = document.querySelectorAll(`[${CLASS_ATTRIBUTE_NAME}]`)
  //     for (let i = 0; i < mounted.length; i += 1) {
  //       ReactDOM.unmountComponentAtNode(mounted[i])
  //     }
  //   }
  // }

  private mountComponents() {
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

      const component = this.#registeredComponents[className]

      if (component) {
        if (node.innerHTML.length === 0) this.render(node, component)
      } else {
        console.error(
          `react-components-rails: can not render a component that has not been registered: ${className}`
        )
      }
    }
  }

  setup(components = {}) {
    this.loadReactDOMClient().then(() => {
      window.ReactComponentsRails.registerComponents(components)
      window.ReactComponentsRails.mountComponents()
    })
  }

  private loadReactDOMClient() {
    return new Promise<void>((resolve) => {
      if (this.#ReactDOMClient) resolve()

      import("react-dom/client")
        .then((i) => {
          // with some bundlers, it can be imported as `.default`, while not with some others
          this.#ReactDOMClient = i.default || i
          resolve()
        })
        .catch(() => {
          // if this fails, then we will fallback to the legacy API
          this.#ReactDOMClient = false
          resolve()
        })
    })
  }
}

const instance = ReactComponentsRails.getInstance()

export default instance
