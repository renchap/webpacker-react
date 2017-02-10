require "test_helper"

class RendererTest < ActionDispatch::IntegrationTest
  test "renders from a view" do
    get "/view"
    assert_select "div[data-react-class]", true
  end

  test "renders from a controller" do
    get "/controller"
    assert_select "div[data-react-class]", true
  end

  test "component mounts" do
    require_js

    visit "/view"
    assert page.has_content? "Hello, I am a component rendered from a view!"
  end

  test "consecutive components mounts" do
    require_js

    visit "/view_consecutive"

    assert page.has_content? "component 1"
    assert page.has_content? "component 2"
  end

  private

    def require_js
      Capybara.current_driver = Capybara.javascript_driver
    end
end
