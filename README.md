# Webpacker-React [![CircleCI](https://circleci.com/gh/renchap/webpacker-react.svg?style=svg)](https://circleci.com/gh/renchap/webpacker-react)

*__Note:__ This is the documentation for the Git master branch. Documentation for the latest release (0.3.1) is [available here](https://github.com/renchap/webpacker-react/tree/v0.3.1).*

Webpacker-React makes it easy to use [React](https://facebook.github.io/react/) with [Webpacker](https://github.com/rails/webpacker) in your Rails applications.

It supports Webpacker 1.2+.

An example application is available: https://github.com/renchap/webpacker-react-example/

## Installation

Your Rails application needs to use Webpacker and have the React integration done. Please refer to their documentation documentation for this: https://github.com/rails/webpacker/blob/master/README.md#ready-for-react

First, you need to add the webpacker-react gem to your Rails app Gemfile:

```ruby
gem 'webpacker-react', "~> 0.3.1"
```

Once done, run `bundle` to install the gem.

Then you need to update your `package.json` file to include the `webpacker-react` NPM module:

`./bin/yarn add webpacker-react`

You are now all set!

### Note about versions

Webpacker-React contains two parts: a Javascript module and a Ruby gem. Both of those components respect [semantic versioning](http://semver.org). **When upgrading the gem, you need to upgrade the NPM module to the same minor version**. New patch versions can be released for each of the two independently, so it is ok to have the NPM module at version `A.X.Y` and the gem at version `A.X.Z`, but you should never have a different `A` or `X`.

## Usage

The first step is to register your root components (those you want to load from your HTML).
In your pack file (`app/javascript/packs/*.js`), import your components as well as `webpacker-react` and register them. Considering you have a component in `app/javascript/components/hello.js`:

```javascript
import Hello from 'components/hello'
import WebpackerReact from 'webpacker-react'

WebpackerReact.setup({Hello}) // ES6 shorthand for {Hello: Hello}
```

### With Turbolinks

You have to make sure Turbolinks is loaded before calling `WebpackerReact.initialize()`.

For example:

```javascript
import Hello from 'components/hello'
import WebpackerReact from 'webpacker-react'
import Turbolinks from 'turbolinks'

Turbolinks.start()

WebpackerReact.setup({Hello})
```

You may also load turbolinks in regular asset pipeline `application.js`:

```javascript
//= require "turbolinks"
```

In that case, make sure your packs are loaded *after* `application.js`

Now you can render React components from your views or your controllers.

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

*Note: you need to have [Webpack process your code](https://github.com/rails/webpacker#binstubs) before it is available to the browser, either by manually running `./bin/webpack` or having the `./bin/webpack-watcher` process running.*

### Hot Module Replacement

[HMR](https://webpack.js.org/guides/hmr-react/) allows to reload / add / remove modules live in the browser without
reloading the page. This allows any change you make to your React components to be applied as soon as you save,
preserving their current state.

First, install `react-hot-loader` (version 3):

```
./bin/yarn add react-hot-loader@beta
```

You then need to update your Webpack config.

We provide a convenience function to add the necessary changes to your config if it's not
significantly different than the standard Webpacker config:

```js
//development.js
...

const sharedConfig = require('./shared.js')
const configureHotModuleReplacement = require('webpacker-react/configure-hot-module-replacement')

module.exports = merge(configureHotModuleReplacement(sharedConfig), ...)
```

If you need to change your configuration manually:

1. add `react-hot-loader/babel` to your `babel-loader` rules:
    ```javascript
    {
    module: {
      rules: [
        {
          test: /\.jsx?(.erb)?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            plugins: ['react-hot-loader/babel']
          }
        }
    }
    ```

2. prepend `react-hot-loader/patch` to your entries:
    ```javascript
    {
      entry:
        { application: [ 'react-hot-loader/patch', '../app/javascript/packs/application.js' ],
        ...
    }
    ```

3. you now need to use `webpack-dev-server` (in place of `webpack` or `webpack-watcher`). Make sure the following line is in your development.rb:
    ```ruby
    config.x.webpacker[:dev_server_host] = 'http://localhost:8080/'
    ```
and start `webpack-dev-server` in hot replacement mode:
    ```
    ./bin/webpack-dev-server --hot
    ```

4. finally opt in to HMR from your pack files:
    ```es6
    import SomeRootReactComponent from 'components/some-root-react-component'
    import WebpackerReact from 'webpacker-react/hmr'

    WebpackerReact.setup({SomeRootReactComponent})
    if (module.hot)
      module.hot.accept('components/some-root-react-component', () =>
        WebpackerReact.renderOnHMR(SomeRootReactComponent) )
    ```

You also need to ensure that `output.publicPath` are correctly set. This should be already handled by Webpacker.

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
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/renchap/webpacker-react.
Please feel free to open issues about your needs and features you would like to be added.

## Wishlist

- [ ] server-side rendering (#3)

### Thanks

This gem has been inspired by the awesome work on [react-rails](https://github.com/reactjs/react-rails) and [react_on_rails](https://github.com/shakacode/react_on_rails/). Many thanks to their authors!
