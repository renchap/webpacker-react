# Configure Rails Environment
ENV["RAILS_ENV"] = "test"

require File.expand_path("../example_app/config/environment.rb", __FILE__)
require "rails/test_help"
require "rails/generators"
require "pathname"
require "minitest/mock"

CACHE_PATH = Pathname.new File.expand_path("../example_app/tmp/cache", __FILE__)

Rails.backtrace_cleaner.remove_silencers!
