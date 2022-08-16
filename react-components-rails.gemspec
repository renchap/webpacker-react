# frozen_string_literal: true

lib = File.expand_path("lib", __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

Gem::Specification.new do |spec|
  spec.name = "react-components-rails"
  spec.licenses = ["MIT"]
  spec.version = "1.0.0.beta4"
  spec.authors = ["Renaud Chaput"]
  spec.email = ["renchap@gmail.com"]

  spec.summary = "Provides Rails helpers to render React Components"
  # spec.description   = %q{TODO: Write a longer description or delete this line.}
  spec.homepage = "https://github.com/renchap/webpacker-react"

  spec.files = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features)/})
  end
  spec.bindir = "exe"
  spec.executables = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.required_ruby_version = ">= 2.7.0"

  spec.add_development_dependency "bundler", "~> 2.3"
  # spec.add_development_dependency "rake", "~> 12.0"
  # spec.add_development_dependency "minitest", "~> 5.0"
  # spec.add_development_dependency "capybara"
  # spec.add_development_dependency "selenium-webdriver"
end
