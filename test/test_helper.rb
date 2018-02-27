$LOAD_PATH.unshift File.expand_path("../../lib", __FILE__)

require "rails_helper"
require "webpacker/react"
require "minitest/autorun"
require "capybara/rails"

require "selenium/webdriver"

Capybara.register_driver :headless_chrome do |app|
  capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
    chromeOptions: { args: %w(headless disable-gpu) }
  )

  Capybara::Selenium::Driver.new app,
    browser: :chrome,
    desired_capabilities: capabilities
end

Capybara.javascript_driver = :headless_chrome

class ActionDispatch::IntegrationTest
  class DriverJSError < StandardError; end
  include Capybara::DSL

  def setup
    @ignored_js_errors = []
  end

  def teardown
    if Capybara.current_driver == :headless_chrome
      errors = current_js_errors.select do |message|
        # If the message matches any ones ignored, skip it
        puts "==="
        puts @ignored_js_errors.inspect
        puts message
        !@ignored_js_errors.any? { |e| !(message =~ e) }
      end

      assert errors.empty?, "Got JS errors: \n#{errors.join("\n\n")}"
    end

    Capybara.current_driver = nil
  end

  def require_js
    Capybara.current_driver = Capybara.javascript_driver
  end

  def current_js_errors
    page.driver.browser.manage.logs.get(:browser)
      .select { |e| e.level == "SEVERE" && message.present? }
      .map(&:message)
      .to_a
  end

  def assert_js_error(error_match)
    error = current_js_errors.find { |e| e. =~ error_match }

    if error
      @ignored_js_errors << error
    else
      puts error.to_s
      assert false, "Expected a JS error matching: #{error_match.to_s}"
    end
  end
end
