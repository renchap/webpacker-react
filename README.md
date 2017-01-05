# Webpacker::React

Webpacker-React makes it easy to use [React](https://facebook.github.io/react/) with [Webpacker](https://github.com/rails/webpacker) in your Rails applications.

This gem is a work in progress. Final feature list :

- [x] render React components from views using a `react_component` helper
- [ ] render React components from controllers using `render react_component: 'name'`
- [ ] render components server-side
- [ ] support for [hot reloading](https://github.com/gaearon/react-hot-loader)
- [ ] use a Rails generator to create new components

## Installation

First, you need to add the WebpackerReact gem to your Rails app Gemfile :

```ruby
gem 'webpacker-react', github: 'renchap/webpacker-react'
```

Once done, run `bundler` to install the gem.

Then you need to update your `vendor/package.json` file to include the `webpacker-react` NPM module :
```json
  "dependencies": {
    "..."
    "webpacker-react": "~>0.0.1"
  },
```

Finally, run `./bin/yarn` to install the module. You are now all set!

## Usage

The first step is to register your root components (those you want to load from your HTML).
In your pack file (`app/javascript/packs/*.js`), import your components as well as `webpacker-react` and register them :

```javascript
import Hello from '../hello';
import WebpackerReact from 'webpacker-react';

WebpackerReact.register(Hello);
```

Now you can use the `react_component` helper in your views to render your React component :

```erb
<%= react_component('Hello', name: 'React') %>
```

## Development

Please feel free to open issues to discuss various ideas/needs.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/renchap/webpacker-react.
