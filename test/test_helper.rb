$LOAD_PATH.unshift File.expand_path("../../lib", __FILE__)

require "rails_helper"
require "webpacker/react"
require "minitest/autorun"
require "capybara/rails"

class ActionDispatch::IntegrationTest
  include Capybara::DSL
  require "capybara/poltergeist"

  Capybara.javascript_driver = :poltergeist

  def teardown
    Capybara.current_driver = nil
  end

  def require_js
    Capybara.current_driver = Capybara.javascript_driver
  end
end
