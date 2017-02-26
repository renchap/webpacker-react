# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
## 0.2.0 - in progress
### Added
- support for Turbolinks5, Turbolinks 2.4 and PJAX. Components will be mounted and unmounted when Turbolinks-specific events occur. Also, the integration works with Turbolinks 5 cache.
- Now, Webpacker::React *always* requires an explicit initialization via `WebpackerReact.initialize()`, which must be done after the Turbolinks initialization, if the Turbolinks library is used.
## 0.1.0 - 2017-02-23
### Added
- First released version
- render React components from views using the `react_component` helper
- render React components from controllers using `render react_component: 'name'` (#1 by @daninfpj)
- basic Hot Module Remplacement (#7 by @mfazekas)

[Unreleased]: https://github.com/renchap/webpacker-react/compare/v0.1.0...HEAD
