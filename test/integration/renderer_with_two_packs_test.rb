require "test_helper"
require "irb"

class RendererWithTwoPacksTest < ActionDispatch::IntegrationTest
  test "component mounts" do
    require_js

    visit "/two_packs/view_all"
    assert_js_error(/Following components are already registered: HelloReact/)
    assert page.has_content? "Hello, I am a component rendered from a view!"
    assert page.has_content? "Component A"
    assert page.has_content? "Component B"
  end
end
