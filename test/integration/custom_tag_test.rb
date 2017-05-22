require "test_helper"

class CustomTagTest < ActionDispatch::IntegrationTest
  test "renders from a view with a custom tag" do
    require_js

    visit "/custom_tag_view"
    assert_selector "span[data-react-class]", text: "Hello, I am a component rendered from a view in a span!"
  end

  test "renders from a controller with a custom tag" do
    require_js

    visit "/custom_tag_controller"
    assert_selector "span[data-react-class]", text: "Hello, I am a component rendered from a controller in a span!"
  end
end
