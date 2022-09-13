# coding: utf-8
lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "webpacker/react/version"

Gem::Specification.new do |spec|
  spec.name = "webpacker-react"
  spec.licenses = ["MIT"]
  spec.version = Webpacker::React::VERSION
  spec.authors = ["Renaud Chaput"]
  spec.email = ["renchap@gmail.com"]

  spec.summary = "Provides React integration for Webpacker"
  # spec.description   = %q{TODO: Write a longer description or delete this line.}
  spec.homepage = "https://github.com/renchap/webpacker-react"

  spec.files = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.bindir = "exe"
  spec.executables = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.required_ruby_version = ">= 2.3.0"

  spec.add_development_dependency "webpacker"
  spec.add_development_dependency "rails"
  spec.add_development_dependency "sprockets-rails"
  spec.add_development_dependency "webdrivers"
  spec.add_development_dependency "puma"
  spec.add_development_dependency "bundler"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "minitest"
  spec.add_development_dependency "capybara"
  spec.add_development_dependency "selenium-webdriver"
end
