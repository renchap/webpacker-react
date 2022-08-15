# React-Components-Rails

_**Note:** This project was formerly known as `webpacker-rails`. Following Webpacker's deprecation, it has been renamed and rewritten to no longer rely on Webpacker. Documentation for the latest `webpacker-rails` release (1.0.0-beta.1) is [available here](https://github.com/renchap/webpacker-react/tree/v1.0.0-beta.1)._

React-Components-Rails makes it easy to use [React](https://reactjs.org/) with your Rails applications. It provides Controller and View helpers to render React Components on your application, and does not case about the way you ship your Javascript

## Installation

First, you need to add this gem to your Rails app Gemfile:

```ruby
gem 'react-components-rails', "~> 1.0.0.beta.2"
```

Once done, run `bundle` to install the gem.

Then you need to update your `package.json` file to include the `react-components-rails` Javascript module:

`yarn add react-components-rails`

You are now all set!

### Note about versions

React-Components-Rails contains two parts: a Javascript module and a Ruby gem. Both of those components respect [semantic versioning](http://semver.org). **When upgrading the gem, you need to upgrade the NPM module to the same minor version**. New patch versions can be released for each of the two independently, so it is ok to have the NPM module at version `A.X.Y` and the gem at version `A.X.Z`, but you should never have a different `A` or `X`.

## Usage

The first step is to register your root components (those you want to load from your HTML).
In your app entry file, import your components as well as `react-components-rails` and register them. Considering you have a component in `app/javascript/components/hello.js`:

```javascript
import Hello from "components/hello"
import ReactComponentsRails from "react-components-rails"

ReactComponentsRails.setup({ Hello }) // ES6 shorthand for { Hello: Hello }
```

### Rendering from a view

Use the `react_component` helper. The first argument is your component's name, the second one is the `props`:

```erb
<%= react_component('Hello', name: 'React') %>
```

You can pass a `tag` argument to render the React component in another tag than the default `div`. All other arguments will be passed to `content_tag`:

```erb
<%= react_component('Hello', { name: 'React' }, tag: :span, class: 'my-custom-component') %>
# This will render <span class="my-custom-component" data-react-class="Hello" data-react-props="..."></span>
```

### Rendering from a controller

```rb
class PageController < ApplicationController
  def main
    render react_component: 'Hello', props: { name: 'React' }
  end
end
```

You can use the `tag_options` argument to change the generated HTML, similar to the `react_component` method above:

```rb
render react_component: 'Hello', props: { name: 'React' }, tag_options: { tag: :span, class: 'my-custom-component' }
```

You can also pass any of the usual arguments to `render` in this call: `layout`, `status`, `content_type`, etc.

### Hot Module Replacement

It should be supported out of the box, if supported by your Javascript stack. Please refer to your Javascript compiler/bundler documentation to do so.

## React versions

This package tries to support both the legacy React DOM interface (`ReactDOM.render`) and the new one introduced in React 18 (`ReactDOM.createRoot`).

The installed React version is tested at runtime by trying to import `react-dom/client`. If the import succeeds then the new API is used, otherwise we fallback to the legacy API.

<!--
## Development

To work on this gem locally, you first need to clone and setup [the example application](https://github.com/renchap/webpacker-react-example).

Then you need to change the example app Gemfile to point to your local repository and run bundle afterwise:

```ruby
gem 'webpacker-react', path: '~/code/webpacker-react/'
```

Finally, you need to tell Yarn to use your local copy of the NPM module in this application, using [`yarn link`](https://yarnpkg.com/en/docs/cli/link):

```
$ cd ~/code/webpacker-react/javascript/webpacker_react-npm-module/
$ yarn
$ cd dist/
$ yarn             # compiles the code from src/ to dist/
$ yarn link
success Registered "webpacker-react".
info You can now run `yarn link "webpacker-react"` in the projects where you want to use this module and it will be used instead.
$ cd ~/code/webpacker-react-example/
$ yarn link webpacker-react
success Registered "webpacker-react".
```

After launching `./bin/webpack-watcher` and `./bin/rails server` in your example app directory, you can now change the Ruby or Javascript code in your local `webpacker-react` repository, and test it immediately using the example app.

## Testing

If you changed the local javascript package, first ensure it is build (see above).

To run the test suite:

```sh
$ rake test
```

If you change the javascript code, please ensure there are no style errors before committing:

```sh
$ cd javascript/webpacker_react-npm-module/
$ yarn lint
``` -->

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/renchap/webpacker-react.
Please feel free to open issues about your needs and features you would like to be added.

### Thanks

This gem has been inspired by the awesome work on [react-rails](https://github.com/reactjs/react-rails) and [react_on_rails](https://github.com/shakacode/react_on_rails/). Many thanks to their authors!
