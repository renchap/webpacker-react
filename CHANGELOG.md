# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

### Added
- Instructions to set up `react-hot-loader` 4 (fixed #51)

### Updated
- Instructions for setting up `webpacker-react` with a modern Webpacker version

### Changed
- Tests now uses headless chrome instead of Poltergeist
- Babel is configured with `babel-preset-env`

### Removed
- Support for `react-hot-loader`. Please look at the README for instructions on how to use `react-hot-loader` 4 with your app, it is much simpler and better!

## [0.3.2] - 2017-09-13

### Fixed
- The whole `lodash` library was imported, resulting in a big bundle. Specific `lodash` functions`imports` are now used.
- Helpers are now loaded on `ActionView` loading (fixes #38)

## [0.3.1] - 2017-05-30

### Fixed
- Move test Rake tasks out of `lib/tasks` (fixes #33)

## [0.3.0] - 2017-05-27

### Added
- Webpacker 1.2 and 2.0 support
- Added a `tag` option to change the tag used to render the component (default is `div`)

## [0.2.0] - 2017-03-20

### Added
- support for Turbolinks 5, Turbolinks 2.4 and PJAX. Components will be mounted and unmounted when Turbolinks-specific events occur. Also, the integration works with Turbolinks 5 cache.
- New `WebpackerReact.setup({Component1, Component2, ...})` initialization API. The old API couldn't properly detect the components' names, thus user is required to provide the names in the configuration object's keys.
### Removed
- `WebpackerReact.register(Component)` has been dropped in favor of `WebpackerReact.setup({Component})`

## [0.1.0] - 2017-02-23

### Added
- First released version
- render React components from views using the `react_component` helper
- render React components from controllers using `render react_component: 'name'` (#1 by @daninfpj)
- basic Hot Module Remplacement (#7 by @mfazekas)

[Unreleased]: https://github.com/renchap/webpacker-react/compare/v0.3.2...HEAD
[0.3.2]: https://github.com/renchap/webpacker-react/tree/v0.3.2
[0.3.1]: https://github.com/renchap/webpacker-react/tree/v0.3.1
[0.3.0]: https://github.com/renchap/webpacker-react/tree/v0.3.0
[0.2.0]: https://github.com/renchap/webpacker-react/tree/v0.2.0
[0.1.0]: https://github.com/renchap/webpacker-react/tree/v0.1.0
