require "test_helper"

class RendererTest < ActionDispatch::IntegrationTest
  def url_prefix
    ""
  end

  test "renders from a view" do
    get url_prefix + "/view"
    assert_select "div[data-react-class]", true
  end

  test "renders from a controller" do
    get url_prefix + "/controller"
    assert_select "div[data-react-class]", true
  end

  test "component mounts" do
    require_js

    visit url_prefix + "/view"
    assert page.has_content? "Hello, I am a component rendered from a view!"
  end

  test "consecutive components mounts" do
    require_js

    visit url_prefix + "/view_consecutive"

    assert page.has_content? "component 1"
    assert page.has_content? "component 2"
  end
end
