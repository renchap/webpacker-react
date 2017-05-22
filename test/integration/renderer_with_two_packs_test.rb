require "test_helper"
require "irb"

class RendererWithTwoPacksTest < ActionDispatch::IntegrationTest
  test "component mounts" do
    require_js

    begin
      visit "/two_packs/view_all"
    rescue Capybara::Poltergeist::JavascriptError => error
      assert error.message =~ /Following components are already registered: HelloReact/
    end

    assert page.has_content? "Hello, I am a component rendered from a view!"
    assert page.has_content? "Component A"
    assert page.has_content? "Component B"
  end

private

  def require_js
    Capybara.current_driver = Capybara.javascript_driver
  end
end
